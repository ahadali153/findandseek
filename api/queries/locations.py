from pydantic import BaseModel
from typing import List, Optional, Union, Tuple
from datetime import date
from queries.pool import pool

# from adventures import AdventureOut


class Error(BaseModel):
    message: str


class LocationIn(BaseModel):
    adventure_id: Optional[int]
    address: str
    latitude: float
    longitude: float


class LocationOut(BaseModel):
    id: int
    adventure_id: int
    address: str
    latitude: float
    longitude: float


class LocationPatch(BaseModel):
    address: Optional[str]


class LocationRepository:
    def get_one(self, location_id: int) -> Optional[LocationOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                             , adventure_id
                             , address
                             , latitude
                             , longitude
                        FROM locations
                        WHERE id = %s
                        """,
                        [location_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_location_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that location"}

    # def get_adventures_by_location(
    #     self, latitude: float, longitude: float
    # ) -> List[AdventureOut]:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 result = db.execute(
    #                     """
    #                     SELECT a.id, a.account_id, a.title, a.description, a.activity_id,
    #                     a.intensity, a.user_rating, a.likes, a.price, a.posted_at,
    #                     a.address, a.image_url
    #                     FROM adventures a
    #                     JOIN locations l ON a.id = l.adventure_id
    #                     WHERE l.latitude = %s AND l.longitude = %s
    #                     """,
    #                     [latitude, longitude],
    #                 )
    #                 return [
    #                     self.record_to_adventure_out(record)
    #                     for record in result
    #                 ]
    #     except Exception as e:
    #         print(e)
    #         return []

    def delete(self, adventure_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM locations
                        WHERE adventure_id = %s
                        """,
                        [adventure_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(
        self, adventure_id: int, location: LocationIn
    ) -> Union[LocationOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE locations
                        SET address = %s, latitude = %s, longitude = %s
                        WHERE adventure_id = %s
                        """,
                        [
                            location.address,
                            location.latitude,
                            location.longitude,
                            adventure_id,
                        ],
                    )
                    return self.location_in_to_out(adventure_id, location)
        except Exception as e:
            print(e)
            return Error(message="Could not update that location")

    def get_all(self) -> Union[Error, List[LocationOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                             , adventure_id
                             , address
                             , latitude
                             , longitude
                        FROM locations
                        ORDER BY id;
                        """
                    )

                    return [
                        self.record_to_location_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all locations"}

    def create(self, location: LocationIn) -> Union[LocationOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO locations
                            (adventure_id, address, latitude, longitude)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id, adventure_id;
                        """,
                        [
                            location.adventure_id,
                            location.address,
                            location.latitude,
                            location.longitude,
                        ],
                    )
                    result = result.fetchone()
                    if result is None:
                        return None

                    location_id, assigned_adventure_id = result

                    created_location = LocationOut(
                        id=location_id,
                        adventure_id=assigned_adventure_id,
                        address=location.address,
                        latitude=location.latitude,
                        longitude=location.longitude,
                    )
                    return created_location
        except Exception as e:
            print(e)
            return None

    def location_in_to_out(self, id: int, location: LocationIn):
        old_data = location.dict()
        old_data["id"] = id
        return LocationOut(**old_data)

    def record_to_location_out(self, record):
        return LocationOut(
            id=record[0],
            adventure_id=record[1],
            address=record[2],
            latitude=record[3],
            longitude=record[4],
        )
