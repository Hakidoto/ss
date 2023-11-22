/*
  Warnings:

  - You are about to drop the column `created_at` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `respondent_name` on the `answers` table. All the data in the column will be lost.
  - Added the required column `question_type` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `answers` DROP FOREIGN KEY `answers_ibfk_1`;

-- DropForeignKey
ALTER TABLE `answers` DROP FOREIGN KEY `answers_ibfk_2`;

-- AlterTable
ALTER TABLE `answers` DROP COLUMN `created_at`,
    DROP COLUMN `respondent_name`,
    MODIFY `survey_id` INTEGER NULL,
    MODIFY `question_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `questions` ADD COLUMN `question_type` ENUM('multiple_choice', 'open_text', 'checkbox', 'radio') NOT NULL;

-- CreateTable
CREATE TABLE `experiencialaboral` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `RFC` VARCHAR(13) NULL,
    `nombreEmpleo` VARCHAR(50) NULL,
    `nombreCompania` VARCHAR(50) NULL,
    `direccion` VARCHAR(50) NULL,
    `telefonoEmpleo` VARCHAR(50) NULL,
    `puestoDesempenado` VARCHAR(50) NULL,
    `sueldoPromedio` VARCHAR(50) NULL,
    `motivoSeparacion` VARCHAR(50) NULL,

    INDEX `RFC`(`RFC`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usrs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `RFC` VARCHAR(13) NULL,
    `nombre` VARCHAR(50) NULL,
    `edad` VARCHAR(3) NULL,
    `direccion` VARCHAR(50) NULL,
    `celular` VARCHAR(50) NULL,
    `telefono` VARCHAR(50) NULL,
    `correo` VARCHAR(50) NULL,
    `redSocial` VARCHAR(50) NULL,
    `tipoEmpleado` VARCHAR(50) NULL,
    `contrato` VARCHAR(50) NULL,
    `horario` VARCHAR(50) NULL,
    `estado` VARCHAR(50) NULL,
    `antiguedad` VARCHAR(50) NULL,

    UNIQUE INDEX `unique_rfc`(`RFC`),
    INDEX `idx_RFC`(`RFC`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `certificaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `RFC` VARCHAR(13) NULL,
    `nombreCertificado` VARCHAR(50) NULL,
    `tipoCertificado` VARCHAR(50) NULL,
    `certificado` MEDIUMBLOB NULL,

    INDEX `RFC`(`RFC`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cursos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `RFC` VARCHAR(13) NULL,
    `nombreCurso` VARCHAR(50) NULL,
    `tipoCurso` VARCHAR(50) NULL,
    `certificado` MEDIUMBLOB NULL,

    INDEX `RFC`(`RFC`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lenguas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `RFC` VARCHAR(13) NULL,
    `lengua` VARCHAR(50) NULL,
    `nivel` VARCHAR(50) NULL,
    `certificado` MEDIUMBLOB NULL,

    INDEX `RFC`(`RFC`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faltas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `RFC` VARCHAR(13) NULL,
    `fecha` VARCHAR(50) NULL,

    INDEX `RFC`(`RFC`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `incapacidades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `RFC` VARCHAR(13) NULL,
    `fechaInicio` VARCHAR(50) NULL,
    `fechaFin` VARCHAR(50) NULL,
    `tipoFalta` VARCHAR(50) NULL,
    `justificante` VARCHAR(50) NULL,

    INDEX `RFC`(`RFC`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `procedimientosadministrativos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `RFC` VARCHAR(13) NULL,
    `fechaInicio` VARCHAR(50) NULL,
    `fechaFin` VARCHAR(50) NULL,
    `tipoProcedimiento` VARCHAR(50) NULL,
    `Estado` VARCHAR(50) NULL,

    INDEX `RFC`(`RFC`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_answers` (
    `user_answer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_id` INTEGER NULL,
    `chosen_answer_ids` TEXT NULL,

    INDEX `question_id`(`question_id`),
    PRIMARY KEY (`user_answer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_question_id_fk` FOREIGN KEY (`question_id`) REFERENCES `questions`(`question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_survey_id_fk` FOREIGN KEY (`survey_id`) REFERENCES `surveys`(`survey_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `experiencialaboral` ADD CONSTRAINT `experiencialaboral_ibfk_1` FOREIGN KEY (`RFC`) REFERENCES `usrs`(`RFC`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `certificaciones` ADD CONSTRAINT `certificaciones_ibfk_1` FOREIGN KEY (`RFC`) REFERENCES `usrs`(`RFC`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cursos` ADD CONSTRAINT `cursos_ibfk_1` FOREIGN KEY (`RFC`) REFERENCES `usrs`(`RFC`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `lenguas` ADD CONSTRAINT `lenguas_ibfk_1` FOREIGN KEY (`RFC`) REFERENCES `usrs`(`RFC`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `faltas` ADD CONSTRAINT `faltas_ibfk_1` FOREIGN KEY (`RFC`) REFERENCES `usrs`(`RFC`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `incapacidades` ADD CONSTRAINT `incapacidades_ibfk_1` FOREIGN KEY (`RFC`) REFERENCES `usrs`(`RFC`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `procedimientosadministrativos` ADD CONSTRAINT `procedimientosadministrativos_ibfk_1` FOREIGN KEY (`RFC`) REFERENCES `usrs`(`RFC`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_answers` ADD CONSTRAINT `user_answers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions`(`question_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
