steps = [
    [
        """
        CREATE TABLE comments (
        id SERIAL PRIMARY KEY NOT NULL,
        content VARCHAR(350) NOT NULL,
        posted_at DATE NOT NULL,
        user_id INTEGER NOT NULL REFERENCES users(id),
        adventure_id INTEGER NOT NULL REFERENCES adventures(id)
        );
        """,
        """
        DROP TABLE comments;
        """,
    ],
]
