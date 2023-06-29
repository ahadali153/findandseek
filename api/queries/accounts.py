# import os
# from psycopg_pool import ConnectionPool

# pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))

from pydantic import BaseModel


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    password: str
    username: str


class AccountOut(BaseModel):
    id: str
    email: str
    username: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries:
    def get(self, email: str) -> AccountOutWithPassword:
        pass

    def create(self, info: AccountIn, hashed_password: str) -> AccountOut:
        pass
