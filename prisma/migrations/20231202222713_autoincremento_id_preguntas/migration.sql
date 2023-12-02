-- DropForeignKey
ALTER TABLE `answers` DROP FOREIGN KEY `answers_ibfk_1`;
-- AlterTable
ALTER TABLE `questions` MODIFY `question_id` INTEGER NOT NULL AUTO_INCREMENT;
-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions`(`question_id`) ON DELETE CASCADE ON UPDATE NO ACTION;