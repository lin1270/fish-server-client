DROP TABLE IF EXISTS user;
CREATE TABLE `user` (
  `id` varchar(64) NOT NULL,
  `account` varchar(64) NOT NULL,
  `pwd` varchar(32) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



DROP TABLE IF EXISTS book;
CREATE TABLE `book` (
  `id` varchar(64) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `sold_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;