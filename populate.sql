-- Insert 10 random users into the `users` table
INSERT INTO `users` (`id`, `name`, `email`, `mobile`, `postcode`, `createdAt`, `updatedAt`)
VALUES
(1, 'Alice Smith', 'alice.smith@example.com', '1234567890', '12345', NOW(), NOW()),
(2, 'Bob Johnson', 'bob.johnson@example.com', '9876543210', '67890', NOW(), NOW()),
(3, 'Charlie Brown', 'charlie.brown@example.com', '5551234567', '11223', NOW(), NOW()),
(4, 'Diana Ross', 'diana.ross@example.com', '4445678901', '33445', NOW(), NOW()),
(5, 'Ethan Hunt', 'ethan.hunt@example.com', '3336789012', '55667', NOW(), NOW()),
(6, 'Fiona Gallagher', 'fiona.gallagher@example.com', '2227890123', '77889', NOW(), NOW()),
(7, 'George Miller', 'george.miller@example.com', '1118901234', '99001', NOW(), NOW()),
(8, 'Hannah Davis', 'hannah.davis@example.com', '6669012345', '22334', NOW(), NOW()),
(9, 'Isaac Newton', 'isaac.newton@example.com', '7770123456', '44556', NOW(), NOW()),
(10, 'Jane Austen', 'jane.austen@example.com', '8881236789', '66778', NOW(), NOW());

-- Insert random data for services into the `data` table
INSERT INTO `data` (`user_id`, `service`, `createdAt`, `updatedAt`)
VALUES
(1, 'PICKUP', NOW(), NOW()),
(1, 'DELIVERY', NOW(), NOW()),
(2, 'PICKUP', NOW(), NOW()),
(3, 'PAYMENT', NOW(), NOW()),
(3, 'DELIVERY', NOW(), NOW()),
(4, 'DELIVERY', NOW(), NOW()),
(5, 'PICKUP', NOW(), NOW()),
(6, 'PAYMENT', NOW(), NOW()),
(7, 'DELIVERY', NOW(), NOW()),
(8, 'DELIVERY', NOW(), NOW()),
(9, 'PICKUP', NOW(), NOW()),
(10, 'PAYMENT', NOW(), NOW()),
(10, 'DELIVERY', NOW(), NOW());
