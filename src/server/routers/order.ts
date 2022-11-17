import { router, protectedProcedure } from '../trpc';
import { getBuyerId, getCartId } from '@/server/functions/identity';

export const orderRouter = router({
  placeOrder: protectedProcedure.mutation(async ({ ctx }) => {
    let id = await getBuyerId(ctx);

    return id;
  })
});
