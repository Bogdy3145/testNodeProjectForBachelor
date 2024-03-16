CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    value TEXT NOT NULL
);

INSERT INTO items (value) VALUES ('Item 1');
INSERT INTO items (value) VALUES ('Item 2');
INSERT INTO items (value) VALUES ('Item 3');
