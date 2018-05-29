DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Olympus OM-D E-M10 Mark II Mirrorless Digital Camera", "Electronics", 499.99, 5),
       ("Little Dark Age (Album - MGMT)", "CDs & Vinyl", 9.99, 6),
       ("GravityLight GL02 Portable Self Powered LED Lamp", "Tools & Home Improvement", 79.99 , 3),
       ("Nature’s Sleep Quilted 10 Gel Memory Foam Mattress, Queen", "Home and Kitchen", 399.25, 2),
       ("AmazonBasics Lightning to USB A Cable - 6 Feet", "Cell Phones and Accessories", 7.99, 10),
       ("Apple MacBook Pro MLVP2LL/A 13-inch Laptop", "Computers", 1538.81, 1),
       ("Destiny 2 - Xbox One Standard Edition", "Video Games", 15.45, 7),
       ("NutriBullet 12-Piece High-Speed Blender/Mixer System", "Health, Household & Baby Care", 59.99, 4),
       ("Unbranded Pocket Notebook, Black (3-pack of Notebooks)", "Office Products", 9.99, 9),
       ("Banana Boat Sport Sunscreen Spray, SPF 30", "Sports & Outdoors", 14.24, 10)
