-- Создание таблицы услуг
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL
);

-- Создание таблицы товаров
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL
);

-- Связь услуг и товаров (пакеты)
CREATE TABLE packages (
    id SERIAL PRIMARY KEY,
    service_id INT REFERENCES services(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE
);

-- Таблица заказов
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    service_id INT REFERENCES services(id),
    total_price NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Товары, входящие в заказ
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id)
);