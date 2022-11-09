import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Health & Beauty' },
      { name: `Women's Fashion` },
      { name: `Men's Fashion` },
      { name: 'Luxury' },
      { name: 'Electronics' },
      { name: 'Sports' },
      { name: 'Other' }
    ]
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
