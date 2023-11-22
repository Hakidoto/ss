/*
  Warnings:

  - The primary key for the `answers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `survey_id` on table `answers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `question_id` on table `answers` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `answers` DROP FOREIGN KEY `answers_question_id_fk`;

-- DropForeignKey
ALTER TABLE `answers` DROP FOREIGN KEY `answers_survey_id_fk`;

-- DropForeignKey
ALTER TABLE `questions` DROP FOREIGN KEY `questions_ibfk_1`;

-- AlterTable
ALTER TABLE `answers` DROP PRIMARY KEY,
    MODIFY `answer_id` INTEGER NOT NULL,
    MODIFY `survey_id` INTEGER NOT NULL,
    MODIFY `question_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`answer_id`, `question_id`, `survey_id`);

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_survey_id_fk` FOREIGN KEY (`survey_id`) REFERENCES `surveys`(`survey_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_question_id_fk` FOREIGN KEY (`question_id`) REFERENCES `questions`(`question_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys`(`survey_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
