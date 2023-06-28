import os
from psycopg_pool import ConnectionPool

pool = ConnectionPool(
    conninfo=os.environ["postgresql://safari:safari@postgres/safari_db"]
)


class LocationQueries:
    def get_locations(self):
        with conn.cursor() as cur:
            cur.execute(
                """

                """
            )
