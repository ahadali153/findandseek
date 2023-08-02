from authenticator import authenticator
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from geocoding import fetch_geocode
import os
from queries.adventures import (
    Error,
    AdventureIn,
    AdventureRepository,
    AdventureOut,
)

load_dotenv()

GOOGLE_MAPS_API_KEY = os.environ.get("GOOGLE_MAPS_API_KEY")
BUCKET_NAME = "findandseek"

router = APIRouter()


@router.post("/adventures", response_model=Union[AdventureOut, Error])
async def create_adventure(
    adventure: AdventureIn,
    response: Response,
    repo: AdventureRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    response.status_code = 200
    account_id = account_data["id"]
    try:
        geocode_result = fetch_geocode(adventure.address, GOOGLE_MAPS_API_KEY)

        if geocode_result is None:
            return Error(message="Geocoding failed")

        latitude, longitude = geocode_result

        adventure.latitude = latitude
        adventure.longitude = longitude
        print("Creating adventure...")
        created_adventure = repo.create(adventure, account_id)

        if isinstance(created_adventure, Error):
            return created_adventure

        assigned_adventure_id = created_adventure.id
        print("Assigned adventure ID:", assigned_adventure_id)

        return created_adventure

    except Exception as e:
        print("Error:", e)
        return Error(message="An error occurred during adventure creation")


@router.get("/adventures", response_model=Union[List[AdventureOut], Error])
def get_all(
    repo: AdventureRepository = Depends(),
):
    return repo.get_all()


@router.put(
    "/adventures/{adventure_id}", response_model=Union[AdventureOut, Error]
)
async def update_adventure(
    adventure_id: int,
    adventure: AdventureIn,
    repo: AdventureRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, AdventureOut]:
    account_id = account_data["id"]
    try:
        geocode_result = fetch_geocode(adventure.address, GOOGLE_MAPS_API_KEY)

        if geocode_result is None:
            return Error(message="Geocoding failed")

        latitude, longitude = geocode_result

        # Update the adventure with the new latitude and longitude
        adventure.latitude = latitude
        adventure.longitude = longitude

        updated_adventure = repo.update(adventure_id, adventure, account_id)

        if isinstance(updated_adventure, Error):
            return updated_adventure

        return updated_adventure

    except Exception:
        return Error(message="Could not update that adventure")


@router.delete("/adventures/{adventure_id}", response_model=bool)
async def delete_adventure(
    adventure_id: int,
    repo: AdventureRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    try:
        return repo.delete(adventure_id)
    except Exception as e:
        print(e)
        return False


@router.get(
    "/adventures/{adventure_id}", response_model=Optional[AdventureOut]
)
def get_one_adventure(
    adventure_id: int,
    response: Response,
    repo: AdventureRepository = Depends(),
) -> Optional[AdventureOut]:
    adventure = repo.get_one(adventure_id)
    if adventure is None:
        response.status_code = 404
    return adventure


@router.get(
    "/adventures/accounts/{account_id}", response_model=Optional[AdventureOut]
)
def get_all_adventures_for_account(
    account_id: int,
    response: Response,
    repo: AdventureRepository = Depends(),
) -> Optional[AdventureOut]:
    adventures = repo.get_all_for_account(account_id)
    print("adventures:", adventures)
    if adventures is None:
        response.status_code = 404
    return adventures
