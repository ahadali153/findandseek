steps = [
    [
        """
        CREATE TABLE likes (
        id SERIAL PRIMARY KEY NOT NULL,
        counter INTEGER,
        user_id INTEGER NOT NULL REFERENCES users(id),
        adventure_id INTEGER NOT NULL REFERENCES adventures(id)
        );
        """,
        """
        DROP TABLE likes;
        """,
    ]
]
