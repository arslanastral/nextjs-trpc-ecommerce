import { router, protectedProcedure } from '../trpc';
import { randomUUID } from 'crypto';
import { getBuyerId, getSellerId, getCartId } from '@/server/functions/identity';
import { getSelectedOrderItems, getCartItemsPrice } from '@/server/functions/cart';
import { z } from 'zod';
import { stripe } from '@/utils/stripe';
import { statusUpdateInputWithId } from '../schema';

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
                name: item.title,
                images: [
                  `https://res.cloudinary.com/dv9wpbflv/image/upload/w_300,f_auto,q_auto/v${item.image}.jpg`
                ]
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

      let payment = await ctx.prisma.payment.create({
        data: {
          id: session.id,
          refId: refId
        }
      });

      for await (const bag of items) {
        const bagPrice: number = bag.items.reduce((price: number, bag) => {
          let currentItemPrice: number = bag.itemCount * +bag.priceInCents;
          return price + currentItemPrice;
        }, 0);

        await ctx.prisma.order.create({
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

        await ctx.prisma.bag.updateMany({
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
        await ctx.prisma.payment.update({
          where: {
            id: payment.id
          },
          data: {
            status: 'SUCCESS'
          }
        });

        let items = await ctx.prisma.order.findMany({
          where: {
            paymentId: payment.id
          },
          select: {
            Bag: {
              select: {
                itemCount: true,
                productId: true
              }
            }
          }
        });

        let bags = items
          .map((e) => {
            return [...e.Bag];
          })
          .flat();

        for await (const product of bags) {
          await ctx.prisma.product.update({
            where: {
              id: product.productId
            },
            data: {
              stock: {
                decrement: product.itemCount
              }
            }
          });
        }

        return { status: paymentSession.status };
      }

      return { status: paymentSession.status };
    }),
  getBuyerOrders: protectedProcedure.query(async ({ ctx }) => {
    let id = await getBuyerId(ctx);
    if (!id) return null;

    let buyerOrders = await ctx.prisma.order.findMany({
      where: {
        buyerId: id
      },
      select: {
        id: true,
        Bag: {
          select: {
            productId: true,
            itemCount: true,
            item: {
              select: {
                image: true,
                title: true,
                priceInCents: true
              }
            }
          }
        },
        seller: {
          select: {
            storeName: true
          }
        },
        payment: {
          select: {
            refId: true,
            status: true
          }
        },
        status: true,
        totalPriceInCents: true
      }
    });

    return buyerOrders;
  }),
  getBuyerOrderById: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      let id = await getBuyerId(ctx);
      if (!id) return null;

      let buyerOrder = await ctx.prisma.order.findUnique({
        where: {
          id: input.id
        },
        select: {
          id: true,
          address: {
            select: {
              id: true,
              isDefault: true,
              city: true,
              country: true,
              postalCode: true,
              region: true,
              addressLine1: true
            }
          },
          Bag: {
            select: {
              productId: true,
              itemCount: true,
              item: {
                select: {
                  image: true,
                  title: true,
                  priceInCents: true
                }
              }
            }
          },
          seller: {
            select: {
              storeName: true
            }
          },
          payment: {
            select: {
              refId: true,
              status: true
            }
          },
          status: true,
          totalPriceInCents: true
        }
      });

      return buyerOrder;
    }),
  getSellerOrders: protectedProcedure.query(async ({ ctx }) => {
    let id = await getSellerId(ctx);
    if (!id) return null;

    let sellerOrders = await ctx.prisma.order.findMany({
      where: {
        sellerId: id,
        payment: {
          status: 'SUCCESS'
        }
      },
      select: {
        id: true,
        Bag: {
          select: {
            productId: true,
            itemCount: true,
            item: {
              select: {
                image: true,
                title: true,
                priceInCents: true
              }
            }
          }
        },
        status: true,
        totalPriceInCents: true
      }
    });

    return sellerOrders;
  }),
  getSellerOrderById: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      let id = await getSellerId(ctx);
      if (!id) return null;

      let sellerOrderById = await ctx.prisma.order.findFirst({
        where: {
          sellerId: id,
          id: input.id,
          payment: {
            status: 'SUCCESS'
          }
        },
        select: {
          id: true,
          Bag: {
            select: {
              productId: true,
              itemCount: true,
              item: {
                select: {
                  image: true,
                  title: true,
                  priceInCents: true
                }
              }
            }
          },
          status: true,
          totalPriceInCents: true,
          address: {
            select: {
              city: true,
              country: true,
              postalCode: true,
              region: true,
              addressLine1: true
            }
          }
        }
      });

      return sellerOrderById;
    }),
  setBuyerOrderStatus: protectedProcedure
    .input(statusUpdateInputWithId)
    .mutation(async ({ input, ctx }) => {
      let id = await getSellerId(ctx);
      if (!id) return null;

      let setBuyerOrderStatus = await ctx.prisma.order.updateMany({
        where: {
          sellerId: id,
          id: input.id,
          payment: {
            status: 'SUCCESS'
          }
        },
        data: {
          status: input.orderStatus
        }
      });

      return input.id;
    })
});
