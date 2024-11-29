CREATE TABLE `users` (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `mobile` VARCHAR(100) DEFAULT NULL,
    `postcode` VARCHAR(100) DEFAULT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`),
    UNIQUE KEY `mobile` (`mobile`)
) ENGINE=InnoDB;

CREATE TABLE `data` (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `user_id` INT unsigned NOT NULL,
    `service` VARCHAR(10) NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `user_service` (`user_id`, `service`),
    INDEX `idx_service` (`service`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;
