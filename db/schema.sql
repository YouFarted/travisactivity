-- this assumes the database dating_app already exists and we're running
-- in a connection alreading using it.

DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
username VARCHAR (30) NOT NULL,
email VARCHAR (50) NOT NULL,
aboutMe VARCHAR (255),
firstName VARCHAR (50) NOT NULL,
lastName VARCHAR (50) NOT NULL,
age INTEGER  (3) NOT NULL,
gender VARCHAR (10) NOT NULL,
hobbies VARCHAR (255),
password VARCHAR (255) NOT NULL,
createdAt DATETIME,
updatedAT DATETIME,
PRIMARY KEY (username));


CREATE TABLE messages (
id INT NOT NULL AUTO_INCREMENT,
subject VARCHAR (50) NOT NULL,
body VARCHAR (255) NOT NULL,
sendingUser_id VARCHAR (30) NOT NULL,
receivingUser_id VARCHAR (30) NOT NULL,
createdAt DATETIME,
updatedAT DATETIME,
PRIMARY KEY (id),
FOREIGN KEY (sendingUser_id) REFERENCES users(username),
FOREIGN KEY (receivingUser_id) REFERENCES users(username));


CREATE TABLE addresses (
id INT NOT NULL AUTO_INCREMENT,
street VARCHAR (150) NOT NULL,
city VARCHAR (50) NOT NULL,
state VARCHAR (50) NOT NULL,
postalCode VARCHAR (10) NOT NULL,
user_id VARCHAR (50) NOT NULL,
createdAt DATETIME,
updatedAT DATETIME,
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES users(username));


CREATE TABLE photos (
id INT NOT NULL AUTO_INCREMENT,
description VARCHAR (255),
attachment BLOB NOT NULL,
user_id VARCHAR (50) NOT NULL,
createdAt DATETIME,
updatedAT DATETIME,
FOREIGN KEY (user_id) REFERENCES users(username),
PRIMARY KEY (id));