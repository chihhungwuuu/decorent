--
-- Insert data for table `user`
--
-- NOTE: The passwords are encrypted using BCrypt
--
-- A generation tool is avail at: https://www.bcryptcalculator.com/
-- The first three people password are: fun123
-- The rest of people password are :test456
--

INSERT INTO `users` (`username`,`password`, `email`, `cellphone`)
VALUES 
('john','$2a$04$eFytJDGtjbThXa80FyOOBuFdK2IwjyWefYkMpiBEFlpBwDH.5PM0K','john@gmail.com','0911222333' ),
('mary','$2a$04$eFytJDGtjbThXa80FyOOBuFdK2IwjyWefYkMpiBEFlpBwDH.5PM0K','mary@gmail.com','0988412563' ),
('susan','$2a$04$eFytJDGtjbThXa80FyOOBuFdK2IwjyWefYkMpiBEFlpBwDH.5PM0K','susan@gmail.com','0932541528' ),
('customer','$2a$10$bxFeJIUuBePAe.OWqGdMVu9bpa74o9kozCn3mZ9vVeGAWEefzZfxm','customer@gmail.com','0911222777' ),
('employee','$2a$10$bxFeJIUuBePAe.OWqGdMVu9bpa74o9kozCn3mZ9vVeGAWEefzZfxm','employee@gmail.com','0988663120' ),
('admin','$2a$10$bxFeJIUuBePAe.OWqGdMVu9bpa74o9kozCn3mZ9vVeGAWEefzZfxm','admin@gmail.com','0932888541' );


--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (name)
VALUES 
('ROLE_USER'),('ROLE_EMPLOYEE'),('ROLE_ADMIN');

SET FOREIGN_KEY_CHECKS = 0;

--
-- Dumping data for table `users_roles`
--

INSERT INTO `users_roles` (user_id,role_id)
VALUES 
(1, 1),
(2, 1),
(2, 2),
(3, 1),
(3, 2),
(3, 3),
(4, 1),
(5, 1),
(5, 2),
(6, 1),
(6, 2),
(6, 3);
