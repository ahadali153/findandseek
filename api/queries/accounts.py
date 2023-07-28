from pydantic import BaseModel
from queries.pool import pool
from typing import List, Optional


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    username: str
    password: str


class AccountOut(BaseModel):
    id: int
    email: str
    username: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountUpdate(BaseModel):
    account_id: int
    profile_picture: str
    biography: str


class AccountAddBioPic(BaseModel):
    profile_picture: Optional[str] = None
    biography: Optional[str] = None


class UserInfo(BaseModel):
    email: str
    biography: str
    profile_picture: str


class AccountQueries:
    def get_account(self, username) -> AccountOutWithPassword:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our SELECT statement
                result = db.execute(
                    """
                    SELECT id
                        , username
                        , email
                        , hashed_password
                    FROM accounts
                    WHERE username = %s;
                    """,
                    [username],
                )
                record = result.fetchone()
                if record is None:
                    return None
                return AccountOutWithPassword(
                    id=int(record[0]),
                    email=record[1],
                    username=record[2],
                    hashed_password=record[3]
                )

    def create(
        self, account: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our SELECT statement
                result = db.execute(
                    """
                    INSERT INTO accounts (email, hashed_password, username)
                    VALUES (%s, %s, %s)
                    RETURNING id;
                    """,
                    [account.email, hashed_password, account.username],
                )
                id = result.fetchone()[0]
                return AccountOutWithPassword(
                    id=id,
                    email=account.email,
                    hashed_password=hashed_password,
                    username=account.username,
                )

    def get_all_accounts(self) -> List[AccountOut]:
        # connect to the database.
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run the SELECT statement to fetch all accounts
                db.execute(
                    """
                    SELECT id, username, email
                    FROM accounts;
                    """
                )
                records = db.fetchall()

                # Create a list of AccountOut objects from the fetched records
                account_list = [
                    AccountOut(
                        id=record[0],
                        email=record[1],
                        username=record[2],
                    )
                    for record in records
                ]
        return account_list

    def update_profile_picture(self, profile_picture: str, account_id: int) -> None:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE accounts
                    SET profile_picture = %s
                    WHERE id = %s;
                    """,
                    [profile_picture, account_id],
                )
                conn.commit()

    def update_biography(self, biography: str, account_id: int) -> None:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE accounts
                    SET biography = %s
                    WHERE id = %s;
                    """,
                    [biography, account_id],
                )
                conn.commit()

    def get_info(self, account_id: int) -> UserInfo:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT email
                            , profile_picture
                            , biography
                        FROM accounts
                        WHERE id = %s
                        """,
                        [account_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return UserInfo(
                        email=record[0],
                        profile_picture=record[1],
                        biography=record[2]
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not get that activity"}

