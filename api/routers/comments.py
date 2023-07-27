from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from typing import List, Optional, Union
from queries.comments import (
    Error,
    CommentsIn,
    CommentsOut,
    CommentsRepository,
)


router = APIRouter()


@router.post(
    "/adventures/{adventure_id}/comments",
    response_model=Union[CommentsOut, Error],
)
async def create_comment(
    comment: CommentsIn,
    response: Response,
    repo: CommentsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    account_id = account_data["id"]
    response.status_code = 200
    return repo.create(comment, account_id)


@router.get(
    "/adventures/{adventure_id}/comments",
    response_model=Union[List[CommentsOut], Error],
)
def get_all(
    adventure_id: int,
    repo: CommentsRepository = Depends(),
):
    return repo.get_all(adventure_id)


@router.put(
    "/adventures/{adventure_id}/comments/{comment_id}",
    response_model=Union[CommentsOut, Error],
)
async def update_comment(
    comment_id: int,
    comment: CommentsIn,
    repo: CommentsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, CommentsOut]:
    account_id = account_data["id"]
    return repo.update(comment_id, comment, account_id)


@router.delete(
    "/adventures/{adventure_id}/comments/{comment_id}", response_model=bool
)
async def delete_one_comment(
    comment_id: int,
    repo: CommentsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(comment_id)


@router.get(
    "/adventures/{adventure_id}/comments/{comment_id}",
    response_model=Optional[CommentsOut],
)
def get_one_comment(
    comment_id: int,
    response: Response,
    repo: CommentsRepository = Depends(),
) -> CommentsOut:
    comment = repo.get_one(comment_id)
    if comment is None:
        response.status_code = 404
    return comment
