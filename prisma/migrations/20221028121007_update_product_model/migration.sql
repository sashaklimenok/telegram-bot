/*
  Warnings:

  - You are about to drop the column `productRatingId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `ProductRating` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productRatingId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "productRatingId";

-- DropTable
DROP TABLE "ProductRating";
