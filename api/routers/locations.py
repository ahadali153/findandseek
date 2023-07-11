from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.locations import (
    Error,
    LocationIn,
    LocationRepository,
    LocationOut,
)

router = APIRouter()


# @router.post("/locations", response_model=Union[LocationOut, Error])
# def create_location(
#     location: LocationIn,
#     response: Response,
#     repo: LocationRepository = Depends(),
# ):
#     response.status_code = 400

#     geocode_result = fetch_geocode(location.address, "YOUR_GOOGLE_MAPS_API_KEY")

#     if geocode_result is None:
#         return {"message": "Geocoding failed"}
#     return repo.create(location)


@router.get("/locations", response_model=Union[List[LocationOut], Error])
def get_all(
    repo: LocationRepository = Depends(),
):
    return repo.get_all()


# @router.put(
#     "/location/{location_id}", response_model=Union[LocationOut, Error]
# )
# def update_location(
#     location_id: int,
#     location: LocationIn,
#     repo: LocationRepository = Depends(),
# ) -> Union[Error, LocationOut]:
#     return repo.update(location_id, location)


# @router.delete("/location/{location_id}", response_model=bool)
# def delete_location(
#     location_id: int,
#     repo: LocationRepository = Depends(),
# ) -> bool:
#     return repo.delete(location_id)


@router.get("/location/{location_id}", response_model=Optional[LocationOut])
def get_one_location(
    location_id: int,
    response: Response,
    repo: LocationRepository = Depends(),
) -> LocationOut:
    location = repo.get_one(location_id)
    if location is None:
        response.status_code = 404
    return location
