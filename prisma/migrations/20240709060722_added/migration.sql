/*
  Warnings:

  - You are about to drop the column `producId` on the `OrderProducts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId,productId]` on the table `OrderProducts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `OrderProducts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderProducts" DROP CONSTRAINT "OrderProducts_producId_fkey";

-- AlterTable
ALTER TABLE "OrderProducts" DROP COLUMN "producId",
ADD COLUMN     "productId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OrderProducts_orderId_productId_key" ON "OrderProducts"("orderId", "productId");

-- AddForeignKey
ALTER TABLE "OrderProducts" ADD CONSTRAINT "OrderProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
