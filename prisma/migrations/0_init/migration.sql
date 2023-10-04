-- CreateTable
CREATE TABLE `answers` (
    `answer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `survey_id` INTEGER NOT NULL,
    `question_id` INTEGER NOT NULL,
    `respondent_name` VARCHAR(255) NOT NULL,
    `answer_text` TEXT NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `question_id`(`question_id`),
    INDEX `survey_id`(`survey_id`),
    PRIMARY KEY (`answer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `questions` (
    `question_id` INTEGER NOT NULL AUTO_INCREMENT,
    `survey_id` INTEGER NOT NULL,
    `question_text` TEXT NOT NULL,

    INDEX `survey_id`(`survey_id`),
    PRIMARY KEY (`question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `surveys` (
    `survey_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `estatus` VARCHAR(25) NOT NULL,

    PRIMARY KEY (`survey_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys`(`survey_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions`(`question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys`(`survey_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

