CREATE TABLE `user` (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `mobile` VARCHAR(255) DEFAULT NULL,
    `postcode` VARCHAR(255) DEFAULT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`),
    UNIQUE KEY `mobile` (`mobile`)
) ENGINE=InnoDB;

CREATE TABLE `lead` (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `user` INT unsigned NOT NULL,
    `service` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;
