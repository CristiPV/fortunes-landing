# Schema: fortunes_landing
USE fortunes_landing;

# Table: prize

INSERT INTO `prize` ( `name`, `description`, `weight`, `preset` ) VALUES
( "Bubbles", "They be floaty !", 20.5, 1 ),
( "Candy", "All sorts of sweets", 35.5, 1 ),
( "Car", "Brand new sports car", 0.5, 1 ),
( "Laptop", "It can be placed on top the lap", 2.5, 1 ),
( "Stuffed animal", "Fluffy bear", 25.0, 1 ),
( "Pillow", "For the sleepy people", 12.3, 1 );

SELECT * FROM `prize`;