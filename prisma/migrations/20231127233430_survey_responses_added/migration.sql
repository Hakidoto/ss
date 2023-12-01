/*
  Warnings:

  - You are about to drop the `user_answers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_answers` DROP FOREIGN KEY `user_answers_ibfk_2`;

-- DropTable
DROP TABLE `user_answers`;

-- CreateTable
CREATE TABLE `survey_responses` (
    `response_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `survey_id` INTEGER NULL,
    `answer` JSON NULL,
    `response_timestamp` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `survey_id`(`survey_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`response_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `survey_responses` ADD CONSTRAINT `survey_responses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usrs`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `survey_responses` ADD CONSTRAINT `survey_responses_ibfk_2` FOREIGN KEY (`survey_id`) REFERENCES `surveys`(`survey_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
