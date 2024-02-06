/*
  Warnings:

  - You are about to drop the column `is_adopted` on the `pets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "is_adopted",
ADD COLUMN     "adopted_at" TIMESTAMP(3),
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
