---create database 
CREATE DATABASE Utibu
---use utibu 

----create user's table 
CREATE TABLE tbl_users(
    user_id VARCHAR(300) PRIMARY KEY,
    firstname VARCHAR(300) DEFAULT 'no firstname',
    middlename VARCHAR(300) DEFAULT 'no middlename',
    lastname VARCHAR (300) DEFAULT 'no lastname',
    email VARCHAR(300) UNIQUE DEFAULT 'no email',
    password VARCHAR (300) DEFAULT 'no password',
    role VARCHAR (300) DEFAULT 'patient',
    registered_on VARCHAR(300) DEFAULT GETDATE()

)
----create medical  products table
CREATE TABLE tbl_medical_products(
    product_id VARCHAR(300) PRIMARY KEY,
    product_name VARCHAR(300) NOT NULL,
    product_description VARCHAR(300) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0 CHECK (stock_quantity>=0),
    isDeleted INT DEFAULT  0,
    brand VARCHAR(300) DEFAULT NULL
)

SELECT * FROM tbl_medical_products

---create orders table
CREATE TABLE orders(
    order_id VARCHAR(300) PRIMARY KEY,
    order_status VARCHAR(300) DEFAULT 'processing' CHECK (order_status IN ('processing', 'paid','shipped','delivered')),
    order_date VARCHAR (300) DEFAULT GETDATE(),
    user_id VARCHAR (300) DEFAULT 'no user id ' NOT NULL FOREIGN KEY REFERENCES tbl_users(user_id)
)

---create cart table
CREATE TABLE cart(
    cart_id VARCHAR (300) PRIMARY KEY,
    product_id VARCHAR(300) NOT NULL FOREIGN KEY REFERENCES tbl_medical_products(product_id),
    quantity INT DEFAULT 1 NOT NULL,
    user_id VARCHAR(300) NOT NULL FOREIGN KEY REFERENCES tbl_users(user_id)
)

SELECT * FROM cart
---create sales table 
CREATE TABLE sales(
sales_id VARCHAR(200) PRIMARY KEY,
product_id VARCHAR (200) NOT NULL FOREIGN KEY REFERENCES products(id),
quantity INT DEFAULT 1 NOT NULL,
order_id VARCHAR(200) NOT NULL FOREIGN KEY REFERENCES orders(id),
price DECIMAL(10,2) 
)


SELECT  * FROM sales
SELECT  * FROM orders
SELECT *  FROM cart