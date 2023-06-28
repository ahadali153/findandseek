steps = [
    [
        """
        CREATE TABLE activitiesVO (
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL
        );
        """,
        """
        DROP TABLE activitiesVO;
        """,
    ],
]
