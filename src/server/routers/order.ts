import { router, protectedProcedure } from '../trpc';
import { getBuyerId, getCartId } from '@/server/functions/identity';
import { getSelectedOrderItems, getCartItemsPrice } from '@/server/functions/cart';
import { z } from 'zod';

export const orderRouter = router({
  placeOrder: protectedProcedure
    .input(z.object({ addressId: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      let cartId = await getCartId(ctx);
      if (!cartId) return null;

      let buyerId = await getBuyerId(ctx);
      if (!buyerId) return null;

      let items = await getSelectedOrderItems(ctx);
      if (!items) return null;

      let price = await getCartItemsPrice(ctx);

      let sellerOrders = [];

      for await (const bag of items) {
        const bagPrice: number = bag.items.reduce((price: number, bag) => {
          let currentItemPrice: number = (bag.itemCount * +bag.priceInCents) / 100;
          return price + currentItemPrice;
        }, 0);

        let order = await ctx.prisma.order.create({
          data: {
            addressId: input.addressId,
            totalPriceInCents: bagPrice?.toString(),
            buyerId: buyerId,
            Bag: {
              connect: bag.items.map((item) => {
                return { id: item.id };
              })
            },
            sellerId: bag.sellerId
          }
        });

        sellerOrders.push(order);
      }

      return sellerOrders;
    })
});
