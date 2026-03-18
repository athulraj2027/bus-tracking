/*
  Warnings:

  - Added the required column `tempName` to the `Otp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tempPassword` to the `Otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Otp" ADD COLUMN     "tempName" TEXT NOT NULL,
ADD COLUMN     "tempPassword" TEXT NOT NULL;
