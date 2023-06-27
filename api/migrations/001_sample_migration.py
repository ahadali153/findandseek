steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE locations (
            id SERIAL PRIMARY KEY NOT NULL,
            address VARCHAR(350) NOT NULL,
            latitude DECIMAL NOT NULL,
            longitude DECIMAL NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE locations;
        """,
    ],
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
    [
        """
        CREATE TABLE users (
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
        DROP TABLE users;
        """,
    ],
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
    ],
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
