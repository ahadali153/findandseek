from authenticator import authenticator
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, Response, File, UploadFile
from typing import List, Optional, Union
from geocoding import fetch_geocode
import boto3
import uuid
import os
from queries.adventures import (
    Error,
    AdventureIn,
    AdventureRepository,
    AdventureOut,
)
from queries.locations import (
    LocationIn,
    LocationRepository,
)

load_dotenv()

GOOGLE_MAPS_API_KEY = os.environ["GOOGLE_MAPS_API_KEY"]
BUCKET_NAME = "findandseek"

s3 = boto3.client("s3")

router = APIRouter()


@router.post("/adventures", response_model=Union[AdventureOut, Error])
async def create_adventure(
    adventure: AdventureIn,
    response: Response,
    repo: AdventureRepository = Depends(),
    location_repo: LocationRepository = Depends(),
    file: UploadFile = File(...),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    print("data:", account_data)
    response.status_code = 200
    account_id = account_data["id"]
    print("id:", account_id)
    try:
        print("Creating adventure...")
        created_adventure = repo.create(adventure, account_id)
        print("Adventure created:", created_adventure)

        if isinstance(created_adventure, Error):
            print(created_adventure)
            return created_adventure

        geocode_result = fetch_geocode(adventure.address, GOOGLE_MAPS_API_KEY)
        print("Geocode result:", geocode_result)

        if geocode_result is None:
            return Error(message="Geocoding failed")

        latitude = geocode_result[0]
        longitude = geocode_result[1]

        assigned_adventure_id = created_adventure.id
        print("Assigned adventure ID:", assigned_adventure_id)

        location = LocationIn(
            adventure_id=assigned_adventure_id,
            address=adventure.address,
            latitude=latitude,
            longitude=longitude,
        )
        print("Creating location...")
        location_result = location_repo.create(location)
        print("Location created:", location_result)

        if location_result is None:
            return Error(message="Failed to create location")

        location_result.adventure_id = assigned_adventure_id
        location_repo.update(location_result.id, location_result)

        file_name = f"{str(uuid.uuid4())}_{file.filename}"
        s3.upload_fileobj(file.file, BUCKET_NAME, file_name)

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
    location_repo: LocationRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, AdventureOut]:
    account_id = account_data["id"]
    try:
        updated_adventure = repo.update(adventure_id, adventure, account_id)

        if isinstance(updated_adventure, Error):
            return updated_adventure

        geocode_result = fetch_geocode(adventure.address, GOOGLE_MAPS_API_KEY)

        if geocode_result is None:
            return Error(message="Geocoding failed")

        latitude = geocode_result[0]
        longitude = geocode_result[1]

        updated_location = LocationIn(
            adventure_id=adventure_id,
            address=adventure.address,
            latitude=latitude,
            longitude=longitude,
        )
        location_repo.update(adventure_id, updated_location)

        return updated_adventure

    except Exception:
        return Error(message="Could not update that adventure")


@router.delete("/adventures/{adventure_id}", response_model=bool)
async def delete_adventure(
    adventure_id: int,
    repo: AdventureRepository = Depends(),
    location_repo: LocationRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    try:
        location_repo.delete(adventure_id)

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
