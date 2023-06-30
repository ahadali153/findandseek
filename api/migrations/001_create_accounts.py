steps = [
    [
        """
        CREATE TABLE accounts (
        id SERIAL PRIMARY KEY NOT NULL,
        username VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        hashed_password VARCHAR(300) NOT NULL,
        profile_picture BYTEA,
        biography TEXT,
        date_joined DATE
        );
        """,
        """
        DROP TABLE accounts;
        """,
    ],
]
