import { router, protectedProcedure } from '../trpc';
import { getBuyerId } from '@/server/functions/identity';
import { sellerInfoInput } from '../schema';

export const cartRouter = router({
  getCartItems: protectedProcedure.query(async ({ ctx }) => {
    let id = await getBuyerId(ctx);

    return id;
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
