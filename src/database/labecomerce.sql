-- Active: 1689096139346@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

SELECT * FROM users;

PRAGMA table_info (users);

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'u001',
        'fulano',
        'fulano@gmail.com',
        'senhadofulano123',
        datetime('now')
    ), (
        'u002',
        'Cicrano',
        'cicrano@gmail.com',
        'senhadociclano123',
        datetime('now')
    ), (
        'u003',
        'Beltrano',
        'beltrano@gmail.com',
        'senhadobeltrano123',
        datetime('now')
    );

DROP TABLE users;

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

SELECT * FROM products;

SELECT * FROM products WHERE name LIKE '%gamer%';

PRAGMA table_info (products);

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'prod001',
        'Mouse gamer',
        199.99,
        'Sensor óptico de alta precisão, design ergonômico, ajuste DPI on-the-fly, botões programáveis, iluminação RGB personalizável.',
        'https://picsum.photos/seed/Mouse%20gamer/400'
    ), (
        'prod002',
        'Teclado gamer',
        399.99,
        'Teclado Retroiluminado, clique tátil, layout compacto, construção em alumínio, resposta rápida, teclas programáveis.',
        'https://picsum.photos/seed/Teclado%20gamer/400'
    ), (
        'prod003',
        'Mousepad gamer',
        150.00,
        'Superfície de tecido de baixo atrito, base antiderrapante, tamanho estendido, bordas reforçadas, compatível com sensores ópticos/laser.',
        'https://picsum.photos/seed/Mousepad%20gamer/400'
    ), (
        'prod004',
        'Monitor',
        3199.99,
        'Monitor IPS de 240Hz, resolução Full HD, tempo de resposta de 1ms, tecnologia FreeSync/G-Sync, ajuste de altura, cores precisas e amplo ângulo de visão.',
        'https://picsum.photos/seed/Monitor/400'
    ), (
        'prod005',
        'Headset gamer',
        1500,
        'Headset gamer com som surround 7.1, drivers de alta qualidade, microfone retrátil com cancelamento de ruído, conforto ajustável, iluminação RGB, compatibilidade multiplataforma e controles de áudio integrados.',
        'https://picsum.photos/seed/Headset%20gamer/400'
    );

-- Cria um novo usuario na tabela users

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'u004',
        'Maria',
        'maria@gmail.com',
        'senhadamaria123',
        datetime('now')
    );

-- Cria um novo produto na tabela products

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'prod006',
        'Microfone de mesa',
        999.99,
        'Microfone de mesa compacto e de alta qualidade, ideal para videoconferências, gravações de podcasts e transmissões ao vivo. Possui captação direcional, redução de ruídos e conexão USB plug-and-play. Design elegante, com base estável e ajustável, garantindo uma experiência de áudio imersiva e profissional.',
        'https://picsum.photos/seed/Headset%20gamer/400'
    );

SELECT * FROM users;

-- delete user por id

DELETE FROM users WHERE id = 'u001';

SELECT * FROM products;

--procura todos os produtos com a palavra 'gamer'

SELECT * FROM products WHERE name LIKE '%gamer%';

-- delete product por id

DELETE FROM products WHERE id = 'prod003';

-- edição de produto por id, neste caso a query edita todas as colunas do item

UPDATE products
SET
    name = 'Mouse',
    price = 17.99,
    description = 'Mouse',
    image_url = 'imagemUrl'
WHERE id = 'prod001';

-- Cria a tabela de pedidos

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (buyer) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

DROP TABLE purchases;

-- criando pedidos para cada pessoa cadastrada

--pedido do beltrano

INSERT INTO
    purchases (
        id,
        buyer,
        total_price,
        created_at
    )
VALUES (
        'pur001',
        'u003',
        420.00,
        '2023-07-12 10:30:00'
    );

-- pedidos do fulano

INSERT INTO
    purchases (
        id,
        buyer,
        total_price,
        created_at
    )
VALUES (
        'pur002',
        'u001',
        760.00,
        '2023-07-12 11:50:00'
    );

-- pedidos do Cicrano

INSERT INTO
    purchases (
        id,
        buyer,
        total_price,
        created_at
    )
VALUES (
        'pur002',
        'u002',
        290.00,
        '2023-07-12 13:20:00'
    );

-- Alteração do preço total do pedido

-- diminuindo o preço total do pedido com id 'pur001'

UPDATE purchases
SET
    total_price = total_price - 100.00
WHERE id = 'pur001';

-- aumentando o preço total do pedido com  o id 'pur002'

UPDATE purchases
SET
    total_price = total_price + 220.00
WHERE id = 'pur002';

-- Seleciona os campos que serão retornados na consulta

SELECT
    purchases.id AS purchase_id,
    users.id AS buyer_id,
    users.name AS buyer_name,
    users.email AS buyer_email,
    purchases.total_price AS total_price,
    purchases.created_at AS created_at
FROM purchases
    JOIN users ON purchases.buyer = users.id
WHERE purchases.id = 'pur001';

-- Criação da tabela de relações entre produtos e pedidos (purchases_products)

CREATE TABLE
    purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

DROP TABLE purchase_products;

-- inserção de dados na tabela purchase_products

-- Compra 1: Pedido 'pur001' com os produtos 'prod003' (qt 2) e 'prod005' (qnt 1)

INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
VALUES ('pur001', 'prod003', 2), ('pur001', 'prod005', 1);

-- Compra 2: Pedido 'pur002' com os produtos 'prod004' (qt 3) e 'prod006' (qt 1)

INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
VALUES ('pur002', 'prod004', 3), ('pur002', 'prod006', 1);

-- Compra 3: Pedido 'pur003' com o produto 'prod005' (qt 4)

INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
VALUES ('pur003', 'prod005', 4);

-- Consulta com INNER JOIN retornando todas as colunas das tabelas relacionadas (purchases_products, purchases e products)

-- SELECT *

-- FROM purchases_products

--     INNER JOIN purchases ON purchases_products.purchase_id = purchases.id

--     INNER JOIN products ON purchases_products.product_id = products.id

-- WHERE

--     purchases.id = purchases_products.purchase_id;

SELECT
    purchases_products.purchase_id,
    purchases_products.product_id,
    purchases_products.quantity,
    purchases.id AS purchase_id,
    purchases.buyer AS buyer_id,
    purchases.total_price,
    purchases.created_at AS purchase_created_at,
    products.id AS product_id,
    products.name AS product_name,
    products.price AS product_price,
    products.description AS product_description,
    products.image_url AS product_image_url
FROM purchases_products
    INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
    INNER JOIN products ON purchases_products.product_id = products.id;