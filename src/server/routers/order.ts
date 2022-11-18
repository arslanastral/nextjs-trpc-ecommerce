import { router, protectedProcedure } from '../trpc';
import { getBuyerId, getCartId } from '@/server/functions/identity';
import { getSelectedOrderItems, getCartItemsPrice } from '@/server/functions/cart';
import { z } from 'zod';
import { stripe } from '@/utils/stripe';

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

      let lineItems = items.map((e) => e.items).flat();

      const session = await stripe.checkout.sessions.create({
        line_items: lineItems.map((item) => {
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.title
              },
              unit_amount: item.priceInCents
            },
            quantity: item.itemCount
          };
        }) as [],

        mode: 'payment',
        success_url: `${process.env.NEXTAUTH_URL}cart`,
        cancel_url: `${process.env.NEXTAUTH_URL}checkout`
      });

      let sellerOrders = [];

      let payment = await ctx.prisma.payment.create({
        data: {
          id: session.id
        }
      });

      for await (const bag of items) {
        const bagPrice: number = bag.items.reduce((price: number, bag) => {
          let currentItemPrice: number = bag.itemCount * +bag.priceInCents * 100;
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
            sellerId: bag.sellerId,
            paymentId: payment.id
          }
        });

        sellerOrders.push(order);
      }

      return session.url;
    })
});
