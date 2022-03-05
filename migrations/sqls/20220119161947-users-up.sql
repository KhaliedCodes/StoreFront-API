CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    password_digest VARCHAR NOT NULL
);