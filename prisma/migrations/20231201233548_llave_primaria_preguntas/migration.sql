/*
  Warnings:

  - The primary key for the `questions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[question_id]` on the table `questions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `answers` DROP FOREIGN KEY `answers_question_id_fk`;

-- AlterTable
ALTER TABLE `questions` DROP PRIMARY KEY,
    MODIFY `question_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`question_id`, `survey_id`);

-- CreateIndex
CREATE UNIQUE INDEX `questions_question_id_key` ON `questions`(`question_id`);

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions`(`question_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
