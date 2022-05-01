-- CreateTable
CREATE TABLE `Service` (
    `service_name` VARCHAR(191) NOT NULL,
    `last_edited` DATETIME(3) NOT NULL,
    `about_us` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`service_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
