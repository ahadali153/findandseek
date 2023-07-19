from pydantic import BaseModel, Field
from typing import List, Optional, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class ActivitiesIn(BaseModel):
    name: str


class ActivitiesOut(BaseModel):
    id: int
    name: str


class ActivitiesRepository:
    def get_one(self, activity_id: int) -> Optional[ActivitiesOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id
                                , name
                        FROM activities
                        WHERE id = %s
                        """,
                        [activity_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_activities_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that activity"}

    def delete(self, activity_id: int) -> bool:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM activities
                        WHERE id = %s
                        """,
                        [activity_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def get_all(self) -> Union[Error, List[ActivitiesOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id
                                , name
                        FROM activities
                        """
                    )

                    return [
                        self.record_to_activities_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all vacations"}

    def create(self, activities: ActivitiesIn) -> Union[ActivitiesOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO activities
                            (name)
                        VALUES
                            (%s)
                        RETURNING id;
                        """,
                        [activities.name],
                    )
                    id = result.fetchone()[0]
                    # Return new data
                    # old_data = vacation.dict()
                    # return VacationOut(id=id, **old_data)
                    return self.activities_in_to_out(id, activities)
        except Exception:
            return {"message": "Create did not work"}

    def activities_in_to_out(self, id: int, activities: ActivitiesIn):
        old_data = activities.dict()
        return ActivitiesOut(id=id, **old_data)

    def record_to_activities_out(self, record):
        return ActivitiesOut(
            id=record[0],
            name=record[1],
        )
