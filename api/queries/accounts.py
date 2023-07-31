from pydantic import BaseModel
from queries.pool import pool
from typing import List, Optional


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    username: str
    password: str


class AccountOut(BaseModel):
    id: int
    email: str
    username: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountUpdate(BaseModel):
    account_id: int
    prof_pic: str
    biography: str


class AccountAddBioPic(BaseModel):
    prof_pic: Optional[str] = None
    biography: Optional[str] = None


class UserInfo(BaseModel):
    username: str
    biography: Optional[str] = None
    prof_pic: Optional[str] = None


class AccountQueries:
    def get_account(self, username) -> AccountOutWithPassword:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our SELECT statement
                result = db.execute(
                    """
                    SELECT id
                        , username
                        , email
                        , hashed_password
                    FROM accounts
                    WHERE username = %s;
                    """,
                    [username],
                )
                record = result.fetchone()
                if record is None:
                    return None
                return AccountOutWithPassword(
                    id=int(record[0]),
                    email=record[1],
                    username=record[2],
                    hashed_password=record[3]
                )

    def create(
        self, account: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our SELECT statement
                result = db.execute(
                    """
                    INSERT INTO accounts (email, hashed_password, username)
                    VALUES (%s, %s, %s)
                    RETURNING id;
                    """,
                    [account.email, hashed_password, account.username],
                )
                id = result.fetchone()[0]
                return AccountOutWithPassword(
                    id=id,
                    email=account.email,
                    hashed_password=hashed_password,
                    username=account.username,
                )

    def update_prof_pic(self, prof_pic: str, account_id: int) -> None:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE accounts
                    SET prof_pic = %s
                    WHERE id = %s;
                    """,
                    [prof_pic, account_id],
                )
                conn.commit()
                return prof_pic

    def update_biography(self, biography: str, account_id: int) -> None:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE accounts
                    SET biography = %s
                    WHERE id = %s;
                    """,
                    [biography, account_id],
                )
                conn.commit()

    def get_info(self, account_id: int) -> UserInfo:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT username
                            , prof_pic
                            , biography
                        FROM accounts
                        WHERE id = %s
                        """,
                        [account_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return UserInfo(
                        username=record[0],
                        prof_pic=record[1],
                        biography=record[2]
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not get account information"}
