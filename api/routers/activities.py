from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.activities import (
    Error,
    ActivitiesIn,
    ActivitiesOut,
    ActivitiesRepository,
)


router = APIRouter()


@router.post("/activities", response_model=Union[ActivitiesOut, Error])
def create_activity(
    activity: ActivitiesIn,
    response: Response,
    repo: ActivitiesRepository = Depends(),
):
    print(activity)
    response.status_code = 200
    return repo.create(activity)


@router.get("/activities", response_model=Union[List[ActivitiesOut], Error])
def get_all(
    repo: ActivitiesRepository = Depends(),
):
    return repo.get_all()


@router.delete("/activities/{activity_id}", response_model=bool)
def delete_one_activity(
    activity_id: int,
    repo: ActivitiesRepository = Depends(),
) -> bool:
    return repo.delete(activity_id)


@router.get(
    "/activities/{activity_id}", response_model=Optional[ActivitiesOut]
)
def get_one_activity(
    activity_id: int,
    response: Response,
    repo: ActivitiesRepository = Depends(),
) -> ActivitiesOut:
    activity = repo.get_one(activity_id)
    if activity is None:
        response.status_code = 404
    return activity
