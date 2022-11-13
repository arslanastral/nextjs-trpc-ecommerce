import { router, protectedProcedure } from '../trpc';
import { getBuyerId, getCartId } from '@/server/functions/identity';
import { sellerInfoInput } from '../schema';

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

  addToCart: protectedProcedure.query(async ({ ctx }) => {
    let id = await getBuyerId(ctx);

    return id;
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
