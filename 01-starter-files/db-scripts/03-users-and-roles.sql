USE `decorent_furniture`;

SET foreign_key_checks = 0;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `roles`;
SET foreign_key_checks = 1;

--
--	使用hibernate創建資料庫
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cellphone` varchar(50) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(80) NOT NULL,
  `username` varchar(80) NOT NULL
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--
-- NOTE: The passwords are encrypted using BCrypt
--
-- A generation tool is avail at: https://www.bcryptcalculator.com/
-- Default passwords here are: fun123,test456
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
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (name)
VALUES 
('ROLE_USER'),('ROLE_EMPLOYEE'),('ROLE_ADMIN');

SET FOREIGN_KEY_CHECKS = 0;

--
-- Table structure for table `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;

CREATE TABLE `users_roles` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  
  PRIMARY KEY (`user_id`,`role_id`),
  
  KEY `FK_ROLE_idx` (`role_id`),
  
  CONSTRAINT `FK_USER_01` FOREIGN KEY (`user_id`) 
  REFERENCES `users` (`id`) 
  ON DELETE NO ACTION ON UPDATE NO ACTION,
  
  CONSTRAINT `FK_ROLE` FOREIGN KEY (`role_id`) 
  REFERENCES `roles` (`id`) 
  ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;

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
