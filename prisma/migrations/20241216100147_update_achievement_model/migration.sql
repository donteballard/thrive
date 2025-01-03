/*
  Warnings:

  - Added the required column `category` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rarity` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenReward` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Achievement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "earned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "earnedDate" TIMESTAMP(3),
ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rarity" TEXT NOT NULL,
ADD COLUMN     "requirements" TEXT[],
ADD COLUMN     "tokenReward" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
