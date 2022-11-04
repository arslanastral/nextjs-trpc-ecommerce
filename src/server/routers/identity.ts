import { router, protectedProcedure } from '../trpc';
import { getBuyerId, getSellerId, updateSellerInfo } from '@/server/functions/identity';
import { sellerInfoInput } from '../schema';

export const identityRouter = router({
  getBuyerId: protectedProcedure.query(async ({ ctx }) => {
    let id = await getBuyerId(ctx);

    return id;
  }),

  getSellerId: protectedProcedure.query(async ({ ctx }) => {
    let id = await getSellerId(ctx);

    return id;
  }),

  updateSellerInfo: protectedProcedure.input(sellerInfoInput).mutation(async ({ input, ctx }) => {
    let updatedData = await updateSellerInfo(input, ctx);

    return updatedData;
  })
});
