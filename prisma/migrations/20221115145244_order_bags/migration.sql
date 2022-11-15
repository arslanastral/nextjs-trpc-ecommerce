-- DropForeignKey
ALTER TABLE "Bag" DROP CONSTRAINT "Bag_orderId_fkey";

-- AlterTable
ALTER TABLE "Bag" ALTER COLUMN "orderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Bag" ADD CONSTRAINT "Bag_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
