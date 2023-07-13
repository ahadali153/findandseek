from pydantic import BaseModel
from queries.pool import pool
from typing import List


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    username: str
    password: str


class AccountOut(BaseModel):
    id: str
    email: str
    username: str
    hashed_password: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries:
    def get_account(self, username) -> AccountOut:
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
                return AccountOut(
                    id=record[0],
                    email=record[1],
                    username=record[2],
                    hashed_password=record[3],
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
