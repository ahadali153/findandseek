from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel
from queries.locations import LocationQueries


router = APIRouter()


class LocationOut(BaseModel):
    address: str
    latitude: int
    longitude: int


@router.get("/api/locations", response_model=LocationOut)
def get_locations(queries: LocationQueries = Depends()):
    return {"locations": queries.get_locations()}
