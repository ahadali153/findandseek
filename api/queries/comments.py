from pydantic import BaseModel, Field
from typing import List, Optional, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class CommentsIn(BaseModel):
    content: str
    posted_at: date = Field(default_factory=date.today)
    adventure_id: int


class CommentsOut(BaseModel):
    id: int
    content: str
    posted_at: date
    account_id: int
    adventure_id: int


class CommentsRepository:
    def get_one(self, comment_id: int) -> Optional[CommentsOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id
                                , content
                                , posted_at
                                , account_id
                                , adventure_id
                        FROM comments
                        WHERE id = %s
                        """,
                        [comment_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_comments_out(record)
        except Exception:
            return {"message": "Could not get that comment"}

    def delete(self, comment_id: int) -> bool:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM comments
                        WHERE id = %s
                        """,
                        [comment_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(
        self, comment_id: int, comment: CommentsIn, account_id: int
    ) -> Union[CommentsOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE comments
                        SET content = %s
                        WHERE id = %s
                        """,
                        [
                            comment.content,
                            comment_id,
                        ],
                    )
                    # old_data = vacation.dict()
                    # return VacationOut(id=vacation_id, **old_data)
                    return self.comments_in_to_out(
                        comment_id, comment, account_id
                    )
        except Exception:
            return {"message": "Could not update that comment"}

    def get_all(self, adventure_id) -> Union[Error, List[CommentsOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id
                                , content
                                , posted_at
                                , account_id
                                , adventure_id
                        FROM comments
                        WHERE adventure_id =  %s
                        """,
                        [adventure_id],
                    )

                    return [
                        self.record_to_comments_out(record)
                        for record in result
                    ]
        except Exception:
            return {"message": "Could not get all records"}

    def create(
        self, comments: CommentsIn, account_id: int
    ) -> Union[CommentsOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO comments
                            (content, posted_at, account_id, adventure_id)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            comments.content,
                            comments.posted_at,
                            account_id,
                            comments.adventure_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.comments_in_to_out(id, comments, account_id)
        except Exception:
            return {"message": "Create did not work"}

    def comments_in_to_out(
        self, id: int, comments: CommentsIn, account_id: int
    ):
        old_data = comments.dict()
        old_data["account_id"] = account_id
        return CommentsOut(id=id, **old_data)

    def record_to_comments_out(self, record):
        return CommentsOut(
            id=record[0],
            content=record[1],
            posted_at=record[2],
            account_id=record[3],
            adventure_id=record[4],
        )
