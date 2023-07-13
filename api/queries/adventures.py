from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class AdventureIn(BaseModel):
    account_id: int
    title: str
    description: str
    images: bytes
    activity_id: int
    intensity: int
    user_rating: int
    likes: int
    price: int
    posted_at: date
    address: str


class AdventureOut(BaseModel):
    id: int
    account_id: int
    title: str
    description: str
    images: bytes
    activity_id: int
    intensity: int
    user_rating: int
    likes: int
    price: int
    posted_at: date
    address: str


class AdventurePatch(BaseModel):
    title: Optional[str]
    description: Optional[str]
    images: Optional[bytes]
    activity_id: Optional[int]
    intensity: Optional[int]
    user_rating: Optional[int]
    likes: Optional[int]
    price: Optional[int]


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
                            , images
                            , activity_id
                            , intensity
                            , user_rating
                            , likes
                            , price
                            , posted_at
                            , address
                        FROM adventures
                        WHERE id = %s
                        """,
                        [adventure_id],
                    )
                    record = result.fetchone()
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
        self, adventure_id: int, adventure: AdventureIn
    ) -> Union[AdventureOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE adventures
                        SET title = %s
                          , description = %s
                          , images = %s
                          , activity_id = %s
                          , intensity = %s
                          , user_rating = %s
                          , likes = %s
                          , price = %s
                          , address = %s
                        WHERE id = %s
                        """,
                        [
                            adventure.title,
                            adventure.description,
                            adventure.images,
                            adventure.activity_id,
                            adventure.intensity,
                            adventure.user_rating,
                            adventure.likes,
                            adventure.price,
                            adventure.address,
                            adventure_id,
                        ],
                    )
                    return self.adventure_in_to_out(adventure_id, adventure)
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
                            , images
                            , activity_id
                            , intensity
                            , user_rating
                            , likes
                            , price
                            , posted_at
                            , address
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

    def create(self, adventure: AdventureIn) -> Union[AdventureOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO adventures
                            (account_id, title, description, images, activity_id, intensity, user_rating, likes, price, posted_at, address)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            adventure.account_id,
                            adventure.title,
                            adventure.description,
                            adventure.images,
                            adventure.activity_id,
                            adventure.intensity,
                            adventure.user_rating,
                            adventure.likes,
                            adventure.price,
                            adventure.posted_at,
                            adventure.address,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.adventure_in_to_out(id, adventure)
        except Exception:
            return {"message": "Create did not work"}

    def adventure_in_to_out(self, id: int, adventure: AdventureIn):
        old_data = adventure.dict()
        return AdventureOut(id=id, **old_data)

    def record_to_adventure_out(self, record):
        return AdventureOut(
            id=record[0],
            account_id=record[1],
            title=record[2],
            description=record[3],
            images=record[4],
            activity_id=record[5],
            intensity=record[6],
            user_rating=record[7],
            likes=record[8],
            price=record[9],
            posted_at=record[10],
            address=record[11],
        )
