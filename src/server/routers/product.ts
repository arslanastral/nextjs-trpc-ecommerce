import { router, protectedProcedure } from '../trpc';
import { getBuyerId, getSellerId } from '@/server/functions/identity';
import { productInput, productInputWithId } from '../schema';

export const productRouter = router({
  create: protectedProcedure.input(productInput).mutation(async ({ input, ctx }) => {
    // let product = await getBuyerId(ctx);
    // return product;
  }),

  read: protectedProcedure.query(async ({ ctx }) => {}),

  update: protectedProcedure.input(productInputWithId).mutation(async ({ input, ctx }) => {}),
  delete: protectedProcedure.input(productInputWithId).mutation(async ({ input, ctx }) => {})
});
