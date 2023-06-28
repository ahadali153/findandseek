steps = [
    [
        """
        CREATE TABLE likes (
        id SERIAL PRIMARY KEY NOT NULL,
        counter INTEGER,
        account_id INTEGER NOT NULL REFERENCES accounts(id),
        adventure_id INTEGER NOT NULL REFERENCES adventures(id)
        );
        """,
        """
        DROP TABLE likes;
        """,
    ]
]
