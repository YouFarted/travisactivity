-- this assumes the database dating_app already exists and we're running
-- in a connection alreading using it.
/* not finished */

INSERT INTO Users
(username, email, aboutMe, firstName, lastName, age, gender, hobbies, password)
values('SomeGuy1', 'someguy1@gmail.com', 'I do things', 'Some', 'Guy', 20, 'Male', 'doing stuff', 'password1234'),
('SomeGal1', 'somegal1@gmail.com', 'I do more things', 'Some', 'Gal', 22, 'Female', 'doing all stuff', 'password555'),
('SomeGal2', 'somegal2@gmail.com', 'I do all things', 'Some', 'Gal', 29, 'Female', 'doing more things', 'password111');

-- The password for yetanotherguy is a salted&encrypted 'password1234'

INSERT INTO Users
(username, isDeveloper, email, aboutMe, firstName, lastName, age, gender, hobbies, password)
values('yetanotherguy', 1, 'yetanotherguy@gmail.com', 'blahblahblah', 'Another', 'Guy', 1234, 'Male', 'picking my bellybutton and sniffing it', '$2a$10$hu2/j4Iyyp7MTs52B3XuVO3TzujkeJFjPSy8YFklChaejUJc1YYJ6');

INSERT INTO Messages
(subject, body, sendingUser_id, receivingUser_id)
values('subject1', 'This is the first message', 'SomeGuy1', 'SomeGal1'),
('subject2', 'This is the second message', 'SomeGuy1', 'SomeGal1'),
('subject3', 'This is the third message', 'SomeGal1', 'SomeGuy1'),
('subject4', 'This is the fourth message', 'SomeGuy1', 'SomeGal1'),
('subject5', 'This is the fourth message', 'SomeGuy1', 'SomeGal2');

INSERT INTO Addresses
(street, city, state, postalCode, user_id)
values('111','Seattle', 'WA', '98118', 'SomeGuy1'),
('222','Seattle', 'WA', '98119', 'SomeGal1'),
('333','Everett', 'WA', '98120', 'SomeGal2');

INSERT INTO Photos
(description, attachment, user_id)
values('doing things', 'iAmABlob1', 'SomeGuy1'),
('doing things too', 'iAmABlob2', 'SomeGuy1'),
('Not doing stuff', 'iAmABlob3', 'SomeGuy1'),
('doing less', 'iAmABlob4', 'SomeGal1'),
('sitting', 'iAmABlob5', 'SomeGal1'),
('standing', 'iAmABlob6', 'SomeGal2');