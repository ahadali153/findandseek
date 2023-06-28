steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE locations (
            id SERIAL PRIMARY KEY NOT NULL,
            address VARCHAR(350) NOT NULL,
            latitude DECIMAL NOT NULL,
            longitude DECIMAL NOT NULL,
            adventure_id INTEGER NOT NULL REFERENCES adventures(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE locations;
        """,
    ],
]
