import { Context } from '../context';

export async function getProductStock(ctx: Context, id: string) {
  if (!id) return null;

  let product = await ctx.prisma.product.findUnique({
    where: {
      id: id
    },
    select: {
      stock: true
    }
  });

  return product?.stock;
}
