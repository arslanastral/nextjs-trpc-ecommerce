import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const identityRouter = router({
  getBuyerId: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user?.id) return null;

    const buyerId = await ctx.prisma.buyer.upsert({
      where: {
        userId: ctx.session?.user?.id
      },
      update: {},
      create: {
        userId: ctx.session?.user?.id
      }
    });

    return buyerId.id;
  }),

  getSellerId: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user?.id) return null;
    if (!ctx.session?.user?.email) return null;

    const sellerId = await ctx.prisma.seller.upsert({
      where: {
        userId: ctx.session?.user?.id
      },
      update: {},
      create: {
        userId: ctx.session?.user?.id,
        storeEmail: ctx.session?.user?.email,
        storeName: `${ctx.session?.user?.name}'s Store`
      }
    });

    return sellerId.id;
  }),

  updateSellerInfo: protectedProcedure
    .input(
      z.object({
        storeName: z.string().optional(),
        storeEmail: z.string().optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user?.id) return;

      let updatedSellerInfo = await ctx.prisma.seller.update({
        where: {
          userId: ctx.session?.user?.id
        },
        data: {
          storeName: input.storeName,
          storeEmail: input.storeEmail
        }
      });

      let info = {
        storeName: updatedSellerInfo.storeName,
        storeEmail: updatedSellerInfo.storeEmail
      };
      return info;
    })
});
