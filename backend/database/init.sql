CREATE TABLE `Perfume`
(
    `id`            int PRIMARY KEY AUTO_INCREMENT,
    `name`          varchar(255) NOT NULL,
    `gender`        ENUM ('Male', 'Female', 'Unisex'),
    `description`   text DEFAULT null,
    `concentration` ENUM ('Parfum', 'EDP', 'EDT', 'EDC', 'EF'),
    `brand_id`      int,
    `hide`          bool DEFAULT false
);

CREATE TABLE `Sample_Image`
(
    `id`         int PRIMARY KEY AUTO_INCREMENT,
    `perfume_id` int,
    `path`       varchar(255)
);

CREATE TABLE `Brand`
(
    `id`   int PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `hide` bool DEFAULT false
);

CREATE TABLE `Volume`
(
    `id`   int PRIMARY KEY AUTO_INCREMENT,
    `volume` double NOT NULL,
    `hide` bool DEFAULT false
);

CREATE TABLE `Volume_Perfume`
(
    `id`         int PRIMARY KEY AUTO_INCREMENT,
    `perfume_id` int            NOT NULL,
    `volume_id`  int            NOT NULL,
    `price`      decimal(10, 2) NOT NULL
);

CREATE TABLE `Note`
(
    `id`   int PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `hide` bool DEFAULT false
);

CREATE TABLE `Note_Perfume`
(
    `id`         int PRIMARY KEY AUTO_INCREMENT,
    `note_id`    int,
    `perfume_id` int,
    `type`       ENUM ('Top', 'Heart', 'Base')
);

CREATE TABLE `User`
(
    `id`              int PRIMARY KEY AUTO_INCREMENT,
    `name`            varchar(255),
    `email`           varchar(255) UNIQUE NOT NULL,
    `username`        varchar(50) UNIQUE  NOT NULL,
    `hashed_password` varchar(255),
    `is_superuser`    bool DEFAULT false,
    `is_active`       bool DEFAULT true
);

CREATE TABLE `Invoice`
(
    `id`              int PRIMARY KEY AUTO_INCREMENT,
    `user_id`         int,
    `address_id`      int,
    `created_at`      datetime DEFAULT (now()),
    `total` double,
    `delivery_status` ENUM ('Pending', 'Confirmed', 'Shipped', 'Cancelled'),
    `payment_method`  ENUM ('Cash', 'Transfer')
);

CREATE TABLE `Invoice_Details`
(
    `id`                int PRIMARY KEY AUTO_INCREMENT,
    `volume_perfume_id` int,
    `invoice_id`        int,
    `quantity`          int
);

CREATE TABLE `Address`
(
    `id`               int PRIMARY KEY AUTO_INCREMENT,
    `user_id`          int,
    `receiver`         varchar(255),
    `phone_number`     varchar(20),
    `city_name`        varchar(255),
    `ward_name`        varchar(255),
    `delivery_address` varchar(255),
    `hide`             bool DEFAULT false
);

CREATE UNIQUE INDEX `Volume_Perfume_index_0` ON `Volume_Perfume` (`perfume_id`, `volume_id`);

CREATE UNIQUE INDEX `Note_Perfume_index_1` ON `Note_Perfume` (`note_id`, `perfume_id`, `type`);

CREATE UNIQUE INDEX `Invoice_Details_index_2` ON `Invoice_Details` (`volume_perfume_id`, `invoice_id`);

ALTER TABLE `Perfume`
    ADD FOREIGN KEY (`brand_id`) REFERENCES `Brand` (`id`);

ALTER TABLE `Sample_Image`
    ADD FOREIGN KEY (`perfume_id`) REFERENCES `Perfume` (`id`);

ALTER TABLE `Volume_Perfume`
    ADD FOREIGN KEY (`perfume_id`) REFERENCES `Perfume` (`id`);

ALTER TABLE `Volume_Perfume`
    ADD FOREIGN KEY (`volume_id`) REFERENCES `Volume` (`id`);

ALTER TABLE `Note_Perfume`
    ADD FOREIGN KEY (`note_id`) REFERENCES `Note` (`id`);

ALTER TABLE `Note_Perfume`
    ADD FOREIGN KEY (`perfume_id`) REFERENCES `Perfume` (`id`);

ALTER TABLE `Invoice`
    ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);

ALTER TABLE `Invoice`
    ADD FOREIGN KEY (`address_id`) REFERENCES `Address` (`id`);

ALTER TABLE `Invoice_Details`
    ADD FOREIGN KEY (`volume_perfume_id`) REFERENCES `Volume_Perfume` (`id`);

ALTER TABLE `Invoice_Details`
    ADD FOREIGN KEY (`invoice_id`) REFERENCES `Invoice` (`id`);

ALTER TABLE `Address`
    ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);
