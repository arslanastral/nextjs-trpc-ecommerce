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
            selected: true,
            id: true,
            itemCount: true,
            item: {
              select: {
                image: true,
                title: true,
                stock: true,
                priceInCents: true,
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
  toggleBagSelect: protectedProcedure
    .input(z.object({ bagId: z.number(), isSelected: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      let cartId = await getCartId(ctx);
      if (!cartId) return null;

      let selected = await ctx.prisma.bag.update({
        where: {
          id: input.bagId
        },
        data: {
          selected: !input.isSelected
        }
      });

      return selected;
    }),
  toggleAllBagsSelect: protectedProcedure
    .input(z.object({ shouldDeselect: z.boolean().optional() }))
    .mutation(async ({ input, ctx }) => {
      let cartId = await getCartId(ctx);
      if (!cartId) return null;

      let { shouldDeselect } = input;

      let selected = await ctx.prisma.bag.updateMany({
        where: {
          cartId: cartId
        },
        data: {
          selected: shouldDeselect ? false : true
        }
      });

      return selected;
    }),
  getCartItemsPrice: protectedProcedure.query(async ({ ctx }) => {
    let cartId = await getCartId(ctx);
    if (!cartId) return null;

    let cart = await ctx.prisma.bag.findMany({
      where: {
        cartId: cartId,
        selected: true,
        item: {
          stock: {
            gt: 0
          }
        }
      },
      select: {
        itemCount: true,
        item: {
          select: {
            priceInCents: true
          }
        }
      }
    });

    const price: number = cart.reduce((price: number, bag) => {
      let currentItemPrice: number = (bag.itemCount * +bag.item.priceInCents) / 100;
      return price + currentItemPrice;
    }, 0);

    return price;
  }),

  removeFromCart: protectedProcedure.query(async ({ ctx }) => {
    let id = await getBuyerId(ctx);

    return id;
  }),

  updateCartItemCount: protectedProcedure
    .input(sellerInfoInput)
    .mutation(async ({ input, ctx }) => {
      let id = await getBuyerId(ctx);

      return id;
    })
});
