import { router, protectedProcedure } from '../trpc';
import { getBuyerId, getCartId } from '@/server/functions/identity';
import { sellerInfoInput } from '../schema';
import { z } from 'zod';

export const cartRouter = router({
  getCartItems: protectedProcedure.query(async ({ ctx }) => {
    let cartId = await getCartId(ctx);
    if (!cartId) return null;

    let cartItems = await ctx.prisma.cart.findUnique({
      where: {
        id: cartId
      },
      include: {
        items: true
      }
    });

    return cartItems;
  }),

  addToCart: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      let cartId = await getCartId(ctx);
      if (!cartId) return null;

      let addedItem = await ctx.prisma.cart.update({
        where: {
          id: cartId
        },
        data: {
          items: {
            connect: {
              id: input.id
            }
          }
        }
      });

      return addedItem;
    }),

  removeFromCart: protectedProcedure.query(async ({ ctx }) => {
    let id = await getBuyerId(ctx);

    return id;
  }),

  updateCart: protectedProcedure.input(sellerInfoInput).mutation(async ({ input, ctx }) => {
    let id = await getBuyerId(ctx);

    return id;
  })
});
