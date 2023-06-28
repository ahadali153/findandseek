steps = [
    [
        """
        CREATE TABLE adventures (
        id SERIAL PRIMARY KEY NOT NULL,
        user_id INTEGER NOT NULL REFERENCES users(id),
        title VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        images BYTEA NOT NULL,
        location_id INTEGER NOT NULL REFERENCES locations(id),
        activity VARCHAR(50) NOT NULL,
        intensity INTEGER CHECK (intensity >= 1 AND intensity <= 5),
        user_rating INTEGER CHECK (user_rating >= 1 AND user_rating <= 5),
        price INTEGER CHECK (price >= 1 AND price <= 5),
        posted_at DATE NOT NULL
        );
        """,
        """
        DROP TABLE adventures;
        """,
    ],
]
