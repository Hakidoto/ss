-- DropForeignKey
ALTER TABLE `answers` DROP FOREIGN KEY `answers_survey_id_fk`;

-- DropForeignKey
ALTER TABLE `survey_responses` DROP FOREIGN KEY `survey_responses_ibfk_1`;

-- DropForeignKey
ALTER TABLE `survey_responses` DROP FOREIGN KEY `survey_responses_ibfk_2`;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_survey_id_fk` FOREIGN KEY (`survey_id`) REFERENCES `surveys`(`survey_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `survey_responses` ADD CONSTRAINT `survey_responses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usrs`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `survey_responses` ADD CONSTRAINT `survey_responses_ibfk_2` FOREIGN KEY (`survey_id`) REFERENCES `surveys`(`survey_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
