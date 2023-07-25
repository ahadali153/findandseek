from pydantic import BaseModel, Field
from typing import List, Optional, Union
from datetime import date
from queries.pool import pool
from datetime import date


class Error(BaseModel):
    message: str


class AdventureIn(BaseModel):
    title: str
    description: str
    activity_id: int
    intensity: int
    user_rating: int
    likes: int
    price: int
    posted_at: date = Field(default_factory=date.today)
    address: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    image_url: Optional[str] = None


class AdventureOut(BaseModel):
    id: int
    account_id: int
    title: str
    description: str
    activity_id: int
    intensity: int
    user_rating: int
    likes: int
    price: int
    posted_at: date
    address: str
    latitude: float
    longitude: float
    image_url: Optional[str] = None


class AdventurePatch(BaseModel):
    title: Optional[str]
    description: Optional[str]
    activity_id: Optional[int]
    intensity: Optional[int]
    user_rating: Optional[int]
    likes: Optional[int]
    price: Optional[int]
    address: Optional[str]
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class AdventureRepository:
    def get_one(self, adventure_id: int) -> Optional[AdventureOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , account_id
                            , title
                            , description
                            , activity_id
                            , intensity
                            , user_rating
                            , likes
                            , price
                            , posted_at
                            , address
                            , latitude
                            , longitude
                            , image_url
                        FROM adventures
                        WHERE id = %s
                        """,
                        [adventure_id],
                    )
                    record = result.fetchone()
                    print(record)
                    if record is None:
                        return None
                    return self.record_to_adventure_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that adventure"}

    def delete(self, adventure_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM adventures
                        WHERE id = %s
                        """,
                        [adventure_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(
        self, adventure_id: int, adventure: AdventureIn, account_id: int
    ) -> Union[AdventureOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE adventures
                        SET title = %s
                        , description = %s
                        , activity_id = %s
                        , intensity = %s
                        , user_rating = %s
                        , likes = %s
                        , price = %s
                        , address = %s
                        , latitude = %s
                        , longitude = %s
                        WHERE (id, account_id) = (%s, %s)
                        """,
                        [
                            adventure.title,
                            adventure.description,
                            adventure.activity_id,
                            adventure.intensity,
                            adventure.user_rating,
                            adventure.likes,
                            adventure.price,
                            adventure.address,
                            adventure.latitude,
                            adventure.longitude,
                            adventure_id,
                            account_id,
                        ],
                    )
                    return self.adventure_in_to_out(
                        adventure_id, adventure, account_id
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not update that adventure"}

    def get_all(self) -> Union[Error, List[AdventureOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , account_id
                            , title
                            , description
                            , activity_id
                            , intensity
                            , user_rating
                            , likes
                            , price
                            , posted_at
                            , address
                            , latitude
                            , longitude
                            , image_url
                        FROM adventures
                        ORDER BY posted_at;
                        """,
                    )
                    
                    return [
                        self.record_to_adventure_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all adventures"}
        
    def get_all_for_account(self, account_id) -> Union[Error, List[AdventureOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , account_id
                            , title
                            , description
                            , activity_id
                            , intensity
                            , user_rating
                            , likes
                            , price
                            , posted_at
                            , address
                            , latitude
                            , longitude
                            , image_url
                        FROM adventures
                        WHERE account_id = %s
                        ORDER BY posted_at;
                        """,
                        [account_id],
                    )
                    # result = db.fetchall() 
                    print("result:", result)
                    return [
                        self.record_to_adventure_out(record)
                        for record in result
                    ]
        except Exception as e:
            print("e:", e)
            return {"message": "Could not get all adventures for account"}

    def create(
        self,
        adventure: AdventureIn,
        account_id: int,
    ) -> Union[AdventureOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO adventures
                            (account_id, title, description, activity_id, intensity, user_rating, likes, price, posted_at, address, latitude, longitude, image_url)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            account_id,
                            adventure.title,
                            adventure.description,
                            adventure.activity_id,
                            adventure.intensity,
                            adventure.user_rating,
                            adventure.likes,
                            adventure.price,
                            adventure.posted_at,
                            adventure.address,
                            adventure.latitude,
                            adventure.longitude,
                            adventure.image_url
                            if adventure.image_url
                            else None,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.adventure_in_to_out(id, adventure, account_id)
        except Exception as e:
            print(e)
            return {"message": "Failed to create adventure"}

    def adventure_in_to_out(
        self, id: int, adventure: AdventureIn, account_id: int
    ):
        old_data = adventure.dict()
        old_data["account_id"] = account_id
        return AdventureOut(id=id, **old_data)

    def record_to_adventure_out(self, record):
        return AdventureOut(
            id=record[0],
            account_id=record[1],
            title=record[2],
            description=record[3],
            activity_id=record[4],
            intensity=record[5],
            user_rating=record[6],
            likes=record[7],
            price=record[8],
            posted_at=record[9],
            address=record[10],
            latitude=record[11],
            longitude=record[12],
            image_url=record[13],
        )
