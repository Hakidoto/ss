/*
  Warnings:

  - You are about to drop the column `pass` on the `usrs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `usrs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `usrs` DROP COLUMN `pass`,
    ADD COLUMN `password` VARCHAR(20) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `username` ON `usrs`(`username`);
