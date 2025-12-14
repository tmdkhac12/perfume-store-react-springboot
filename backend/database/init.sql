CREATE TABLE `perfume` (
                           `id` int PRIMARY KEY AUTO_INCREMENT,
                           `name` varchar(255) NOT NULL,
                           `gender` ENUM ('Male', 'Female', 'Unisex'),
                           `description` text DEFAULT null,
                           `concentration` ENUM ('Parfum', 'EDP', 'EDT', 'EDC', 'EF'),
                           `brand_id` int,
                           `hide` bool DEFAULT false
);

CREATE TABLE `sample_image` (
                                `id` int PRIMARY KEY AUTO_INCREMENT,
                                `perfume_id` int,
                                `path` varchar(255)
);

CREATE TABLE `brand` (
                         `id` int PRIMARY KEY AUTO_INCREMENT,
                         `name` varchar(255) UNIQUE NOT NULL,
                         `hide` bool DEFAULT false
);

CREATE TABLE `volume` (
                          `id` int PRIMARY KEY AUTO_INCREMENT,
                          `volume` double UNIQUE NOT NULL,
                          `hide` bool DEFAULT false
);

CREATE TABLE `volume_perfume` (
                                  `id` int PRIMARY KEY AUTO_INCREMENT,
                                  `perfume_id` int NOT NULL,
                                  `volume_id` int NOT NULL,
                                  `price` decimal(10,2) NOT NULL
);

CREATE TABLE `note` (
                        `id` int PRIMARY KEY AUTO_INCREMENT,
                        `name` varchar(255) UNIQUE NOT NULL,
                        `hide` bool DEFAULT false
);

CREATE TABLE `note_perfume` (
                                `id` int PRIMARY KEY AUTO_INCREMENT,
                                `note_id` int,
                                `perfume_id` int,
                                `type` ENUM ('Top', 'Heart', 'Base')
);

CREATE TABLE `user` (
                        `id` int PRIMARY KEY AUTO_INCREMENT,
                        `name` varchar(255),
                        `email` varchar(255) UNIQUE NOT NULL,
                        `username` varchar(50) UNIQUE NOT NULL,
                        `hashed_password` varchar(255),
                        `is_superuser` bool DEFAULT false,
                        `is_active` bool DEFAULT true
);

CREATE TABLE `invoice` (
                           `id` int PRIMARY KEY AUTO_INCREMENT,
                           `user_id` int,
                           `address_id` int,
                           `created_at` datetime DEFAULT (now()),
                           `total` double,
                           `delivery_status` ENUM ('Pending', 'Confirmed', 'Shipped', 'Cancelled'),
                           `payment_method` ENUM ('Cash', 'Transfer')
);

CREATE TABLE `invoice_details` (
                                   `id` int PRIMARY KEY AUTO_INCREMENT,
                                   `volume_perfume_id` int,
                                   `invoice_id` int,
                                   `quantity` int
);

CREATE TABLE `address` (
                           `id` int PRIMARY KEY AUTO_INCREMENT,
                           `user_id` int,
                           `receiver` varchar(255),
                           `phone_number` varchar(20),
                           `city_name` varchar(255),
                           `ward_name` varchar(255),
                           `delivery_address` varchar(255),
                           `hide` bool DEFAULT false
);

CREATE UNIQUE INDEX `volume_perfume_index_0` ON `volume_perfume` (`perfume_id`, `volume_id`);

CREATE UNIQUE INDEX `note_perfume_index_1` ON `note_perfume` (`note_id`, `perfume_id`, `type`);

CREATE UNIQUE INDEX `invoice_details_index_2` ON `invoice_details` (`volume_perfume_id`, `invoice_id`);

ALTER TABLE `perfume` ADD FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`);

ALTER TABLE `sample_image` ADD FOREIGN KEY (`perfume_id`) REFERENCES `perfume` (`id`);

ALTER TABLE `volume_perfume` ADD FOREIGN KEY (`perfume_id`) REFERENCES `perfume` (`id`);

ALTER TABLE `volume_perfume` ADD FOREIGN KEY (`volume_id`) REFERENCES `volume` (`id`);

ALTER TABLE `note_perfume` ADD FOREIGN KEY (`note_id`) REFERENCES `note` (`id`);

ALTER TABLE `note_perfume` ADD FOREIGN KEY (`perfume_id`) REFERENCES `perfume` (`id`);

ALTER TABLE `invoice` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `invoice` ADD FOREIGN KEY (`address_id`) REFERENCES `address` (`id`);

ALTER TABLE `invoice_details` ADD FOREIGN KEY (`volume_perfume_id`) REFERENCES `volume_perfume` (`id`);

ALTER TABLE `invoice_details` ADD FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`);

ALTER TABLE `address` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
