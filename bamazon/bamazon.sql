CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(222) NOT NULL,
	department_name VARCHAR(222) NOT NULL,
	price decimal(10,2) NOT NULL,
	stock_quantity INTEGER,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Forrest Gump", "Movies", 16.99, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Lion King Blu-Ray", "Movies", 21.95, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kylie Jenner's Eyelash Curler", "Beauty", 21.00, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rihanna Lipstick", "Beauty", 38.00, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple MacBook Charger", "Electronics", 79.00, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MacBook Pro", "Electronics", 1149.00, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop Cover", "Accessories", 39.99, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Portable Iphone Charger", "Accessories", 59.99, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("1984", "Books", 9.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Hunger Games", "Books", 7.99, 20);