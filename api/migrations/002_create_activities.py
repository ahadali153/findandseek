steps = [
    [
        """
        CREATE TABLE activities (
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL
        );
        """,
        """
        DROP TABLE activities;
        """,
    ],
]
