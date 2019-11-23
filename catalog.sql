DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(45) NULL,
  item VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (department,item, price, stock)
VALUES ("food","Rice StirFry", 5.00, 100);

INSERT INTO products (department,item, price, stock)
VALUES ("food","Dumplings", 3.10, 120);

INSERT INTO products (department,item, price, stock)
VALUES ("food","Pizza", 10.50, 75);

INSERT INTO products (department,item, price, stock)
VALUES ("games","Dead Cells", 8.00, 999)

INSERT INTO products (department,item, price, stock)
VALUES ("games","Dark Souls (Remastered)", 60.00, 120)