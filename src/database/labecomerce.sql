-- Active: 1689080431313@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
    );

SELECT * FROM users;

INSERT INTO users (id, name, email, password, created_at)
    VALUES ("u005", "zecatatu", "zecatatu@email.com", "sasasasasas", "aaaaaa");

INSERT INTO users (id, name, email, password, created_at)
    VALUES ("u006", "tatu", "tatu@email.com", "asasasasasasas", "bbbbbbb");

INSERT INTO users (id, name, email, password, created_at)
    VALUES ("u007", "jaja", "jaja@email.com", "vavavavava", "cccccc");

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

SELECT * FROM products;

INSERT INTO products ( id, name, price, description, image_url)
    VALUES("prod5", "teclado rgb", 85.90, "brilha brilha", "urlimage");
INSERT INTO products ( id, name, price, description, image_url)
    VALUES("prod6", "ventoinha rgb", 25.90, "brilha brilha", "urlimage");
INSERT INTO products ( id, name, price, description, image_url)
    VALUES("prod7", "memoria rgb", 55.93, "brilha brilha", "urlimage");
INSERT INTO products ( id, name, price, description, image_url)
    VALUES("prod8", "placa de video rgb", 885.90, "brilha brilha", "urlimage");
INSERT INTO products ( id, name, price, description, image_url)
    VALUES("prod9", "gabinete rgb", 185.90, "brilha brilha", "urlimage");
INSERT INTO products ( id, name, price, description, image_url)
    VALUES("prod4", "fita led rgb", 15.90, "brilha brilha", "urlimage");