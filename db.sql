CREATE TABLE `users` (
  `userId` int(6) NOT NULL AUTO_INCREMENT,
  `email` text NOT NULL,
  `fname` text NOT NULL,
  `lname` text NOT NULL,
  `balance` number,
  `password` text NOT NULL,
  PRIMARY KEY (`userId`,`email`)
) ENGINE=InnoDB;