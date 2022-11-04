import { router, protectedProcedure } from '../trpc';
import { getBuyerId } from '@/server/functions/identity';

export const addressRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    let buyerId = await getBuyerId(ctx);
    if (!buyerId) return null;

    let addresses = ctx.prisma.address.findMany({
      where: {
        buyerId: buyerId
      }
    });

    return addresses;
  })
});
