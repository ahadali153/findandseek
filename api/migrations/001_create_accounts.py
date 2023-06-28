steps = [
    [
        """
        CREATE TABLE accounts (
        id SERIAL PRIMARY KEY NOT NULL,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(50) NOT NULL,
        profile_picture BYTEA NULL,
        biography TEXT NOT NULL,
        date_joined DATE NOT NULL
        );
        """,
        """
        DROP TABLE accounts;
        """,
    ],
]
