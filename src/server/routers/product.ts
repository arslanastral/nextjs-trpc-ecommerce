import { router, protectedProcedure } from '../trpc';
import { getBuyerId, getSellerId } from '@/server/functions/identity';
import { productInput, productInputWithId } from '../schema';
import { uploadToCloudinary, deleteFromCloudinary } from '../functions/image';
import { z } from 'zod';

export const productRouter = router({
  create: protectedProcedure.input(productInput).mutation(async ({ input, ctx }) => {
    let sellerId = await getSellerId(ctx);
    if (!sellerId) return null;

    let imageId = await uploadToCloudinary(input.image);
    if (!imageId) return null;

    let priceInCents = (input.price * 100).toString();
    let itemCat = +input.category <= 7 ? +input.category : 7; //assign a known category
    let product = await ctx.prisma.product.create({
      data: {
        description: input.description,
        priceInCents: priceInCents,
        image: imageId,
        title: input.title,
        category: {
          connect: {
            id: itemCat
          }
        },
        sellerId: sellerId
      }
    });
    return product;
  }),

  list: protectedProcedure.query(async ({ ctx }) => {
    let sellerId = await getSellerId(ctx);
    if (!sellerId) return null;

    let products = await ctx.prisma.product.findMany({
      where: {
        sellerId: sellerId
      },
      select: {
        id: true,
        priceInCents: true,
        title: true,
        image: true,
        description: true,
        category: true
      }
    });

    return products;
  }),

  update: protectedProcedure.input(productInputWithId).mutation(async ({ input, ctx }) => {}),
  delete: protectedProcedure
    .input(z.object({ id: z.string(), imageId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      let sellerId = await getSellerId(ctx);
      if (!sellerId) return null;

      let deletedProduct = await ctx.prisma.product.deleteMany({
        where: {
          id: input.id,
          sellerId: sellerId
        }
      });

      await deleteFromCloudinary(input.imageId);

      return deletedProduct;
    })
});
