CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(100) 
);