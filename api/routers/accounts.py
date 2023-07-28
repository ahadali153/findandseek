from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountQueries,
    DuplicateAccountError,
    AccountUpdate,
    AccountAddBioPic,
    UserInfo,
)


class AccountForm(BaseModel):
    email: str
    password: str
    username: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(
        email=info.email, password=info.password, username=info.username
    )
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())

@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountIn = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.put("/accountinfo", response_model=str | HttpError)
async def add_info(
    account: AccountAddBioPic,
    request: Request,
    response: Response,
    accounts: AccountQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    print(account_data)
    username = account_data["username"]
    account_id = account_data["id"]
    print(username)

    print(account_id)
    try:
        # Check if the profile_picture field is provided and update it if available
        if account.profile_picture:
            accounts.update_profile_picture(account.profile_picture, account_id)
        # Check if the biography field is provided and update it if available
        if account.biography:
            accounts.update_biography(account.biography, account_id)
        # return accounts.get_account(username)
        return "successful"
    except DuplicateAccountError:
        # raise HTTPException(
        #     status_code=status.HTTP_400_BAD_REQUEST,
        #     detail="Cannot add biography or profile picture",
        # )
        return "Cannot add biography or profile picture"
    except Exception as e:
        return str(e)


@router.get("/userinfo", response_model=UserInfo)
def get_user_info(
    request: Request,
    account: AccountQueries = Depends(),    
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> UserInfo:
    account_info = account.get_info(account_data["id"])
    
    return account_info
    