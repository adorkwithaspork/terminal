CREATE DATABASE bamazon_db;

USE bamazon_db;


CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity DECIMAL(10,2) NULL,
  PRIMARY KEY(item_id)
);

USE bamazon_db;
ALTER TABLE products
ADD product_sales INT NULL;

USE bamazon_db;
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shoes","clothing", 30.00, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chocolate","food", 2.00, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("hover_board","enternainment", 2000.00, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("t-shirts","clothing", 10.00, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("skirts","clothing", 20.00, 7);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("barbie","toys", 15.00, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chicken","food", 6.00, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("gin","food", 20.00, 35);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tv","enternainment", 5000.00, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("purse","clothing", 50.00, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("nintendo","enternainment", 200.00, 7);




USE bamazon_db;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NULL,
  over_head_costs DECIMAL(10,2) NULL,
  PRIMARY KEY(department_id)
);