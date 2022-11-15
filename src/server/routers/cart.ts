import { router, protectedProcedure } from '../trpc';
import { getBuyerId, getCartId } from '@/server/functions/identity';
import { sellerInfoInput } from '../schema';
import { z } from 'zod';

export const cartRouter = router({
  getItemCount: protectedProcedure.query(async ({ ctx }) => {
    let cartId = await getCartId(ctx);
    if (!cartId) return null;

    let items = await ctx.prisma.bag.aggregate({
      where: {
        cartId: cartId
      },
      _sum: {
        itemCount: true
      }
    });

    return items._sum.itemCount ?? 0;
  }),
  getCartItems: protectedProcedure.query(async ({ ctx }) => {
    let cartId = await getCartId(ctx);
    if (!cartId) return null;

    let cart = await ctx.prisma.cart.findUnique({
      where: {
        id: cartId
      },
      select: {
        bags: {
          select: {
            id: true,
            itemCount: true,
            item: {
              select: {
                image: true,
                title: true,
                stock: true,
                seller: {
                  select: {
                    storeName: true
                  }
                }
              }
            }
          }
        }
      }
    });

    return cart?.bags;
  }),

  addToCart: protectedProcedure
    .input(z.object({ id: z.string(), quantity: z.number().min(1) }))
    .mutation(async ({ input, ctx }) => {
      let cartId = await getCartId(ctx);
      if (!cartId) return null;

      let addedItem = await ctx.prisma.bag.upsert({
        where: {
          product_in_cart: {
            cartId: cartId,
            productId: input.id
          }
        },
        update: {
          itemCount: { increment: input.quantity }
        },
        create: {
          cartId: cartId,
          itemCount: 1,
          productId: input.id
        }
      });

      return addedItem;
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
