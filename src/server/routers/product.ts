import { router, protectedProcedure, publicProcedure } from '../trpc';
import { getBuyerId, getSellerId } from '@/server/functions/identity';
import { productInput, productInputWithId } from '../schema';
import { uploadToCloudinary, deleteFromCloudinary } from '../functions/image';
import { z } from 'zod';
import cloudinary from '@/utils/cloudinary';

export const productRouter = router({
  create: protectedProcedure.input(productInput).mutation(async ({ input, ctx }) => {
    let sellerId = await getSellerId(ctx);
    if (!sellerId) return null;

    let imageId = await uploadToCloudinary(input.image);
    if (!imageId) return null;

    let priceInCents = (input.price * 100).toFixed();
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
        stock: true,
        priceInCents: true,
        title: true,
        image: true,
        description: true,
        category: true
      }
    });

    return products;
  }),
  update: protectedProcedure.input(productInputWithId).mutation(async ({ input, ctx }) => {
    let sellerId = await getSellerId(ctx);
    if (!sellerId) return null;

    let updatedImage = input.imageId;

    if (!input.image.includes(input.imageId)) {
      let public_id = input.imageId.split('/')[2];
      updatedImage = (await uploadToCloudinary(input.image, public_id)) ?? input.imageId;
    }

    let priceInCents = (input.price * 100).toFixed();

    let updatedProduct = await ctx.prisma.product.updateMany({
      where: {
        id: input.id,
        sellerId: sellerId
      },
      data: {
        title: input.title,
        priceInCents: priceInCents,
        description: input.description,
        image: updatedImage,
        stock: input.stock
      }
    });

    return updatedProduct;
  }),
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
    }),
  sellableProducts: publicProcedure
    .input(
      z.object({
        id: z.number().min(1).max(7).optional(),
        searchTerm: z.string().min(1).max(50).optional()
      })
    )
    .query(async ({ input, ctx }) => {
      let products = await ctx.prisma.product.findMany({
        where: {
          stock: {
            gt: 0
          },
          category: {
            every: {
              id: input.id ?? undefined
            }
          },
          title: {
            search: input.searchTerm ?? undefined
          }
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
  sellableProductById: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      let product = await ctx.prisma.product.findUnique({
        where: {
          id: input.id
        },
        select: {
          id: true,
          priceInCents: true,
          title: true,
          image: true,
          description: true,
          category: true,
          stock: true
        }
      });

      return product;
    })
});
