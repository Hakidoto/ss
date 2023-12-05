/*
  Warnings:

  - You are about to alter the column `certificado` on the `certificaciones` table. The data in that column could be lost. The data in that column will be cast from `MediumBlob` to `VarChar(255)`.
  - You are about to alter the column `certificado` on the `cursos` table. The data in that column could be lost. The data in that column will be cast from `MediumBlob` to `VarChar(255)`.
  - You are about to alter the column `certificado` on the `lenguas` table. The data in that column could be lost. The data in that column will be cast from `MediumBlob` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE `certificaciones` MODIFY `certificado` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `cursos` MODIFY `certificado` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `lenguas` MODIFY `certificado` VARCHAR(255) NULL;
