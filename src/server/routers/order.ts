import { router, protectedProcedure } from '../trpc';
import { randomUUID } from 'crypto';
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

      let refId = randomUUID();

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
        success_url: `${process.env.NEXTAUTH_URL}payment/${refId}`,
        cancel_url: `${process.env.NEXTAUTH_URL}payment/${refId}`
      });

      let sellerOrders = [];

      let payment = await ctx.prisma.payment.create({
        data: {
          id: session.id,
          refId: refId
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

        let checkedOut = await ctx.prisma.bag.updateMany({
          where: {
            cartId: cartId,
            checkedOut: false,
            selected: true
          },
          data: {
            checkedOut: true,
            selected: false
          }
        });

        sellerOrders.push(order);
      }

      return session.url;
    }),

  verify: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      let payment = await ctx.prisma.payment.findFirst({
        where: {
          refId: input.id
        }
      });

      if (!payment) return null;

      const paymentSession = await stripe.checkout.sessions.retrieve(payment.id);
      if (!paymentSession) return null;

      if (paymentSession.status === 'open') {
        return { status: paymentSession.status, link: paymentSession.url };
      }

      if (payment.status === 'PENDING' && paymentSession.status === 'complete') {
        let updatedPayment = await ctx.prisma.payment.update({
          where: {
            id: payment.id
          },
          data: {
            status: 'SUCCESS'
          }
        });

        return { status: paymentSession.status };
      }

      return { status: paymentSession.status };
    })
});
