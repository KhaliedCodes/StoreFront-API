CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_status VARCHAR(15),
    users_id BIGINT REFERENCES users(id)
);