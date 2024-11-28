/*
  Warnings:

  - You are about to drop the column `deleted` on the `DirectMessage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DirectMessage" DROP COLUMN "deleted",
ADD COLUMN     "delete" BOOLEAN NOT NULL DEFAULT false;
