import { router, protectedProcedure } from '../trpc';
import { getBuyerId, getCartId } from '@/server/functions/identity';
import { getSelectedCartItems, getCartItemsPrice } from '@/server/functions/cart';
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
  getSelectedCartItems: protectedProcedure.query(async ({ ctx }) => {
    let bags = await getSelectedCartItems(ctx);

    return bags;
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
    let price = await getCartItemsPrice(ctx);

    return price;
  }),

  removeFromCart: protectedProcedure.query(async ({ ctx }) => {
    let id = await getBuyerId(ctx);

    return id;
  }),
  incrementItemCount: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      let cartId = await getCartId(ctx);
      if (!cartId) return null;

      let updatedCount = await ctx.prisma.bag.update({
        where: {
          id: input.id
        },
        data: {
          itemCount: {
            increment: 1
          }
        }
      });

      return updatedCount;
    }),
  decrementItemCount: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      let cartId = await getCartId(ctx);
      if (!cartId) return null;

      let updatedCount = await ctx.prisma.bag.update({
        where: {
          id: input.id
        },
        data: {
          itemCount: {
            decrement: 1
          }
        }
      });

      return updatedCount;
    }),

  updateItemCount: protectedProcedure
    .input(z.object({ id: z.number(), quantity: z.number().min(1) }))
    .mutation(async ({ input, ctx }) => {
      let cartId = await getCartId(ctx);
      if (!cartId) return null;

      let updatedCount = await ctx.prisma.bag.update({
        where: {
          id: input.id
        },
        data: {
          itemCount: input.quantity
        }
      });

      return updatedCount;
    }),
  deleteItem: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      let cartId = await getCartId(ctx);
      if (!cartId) return null;

      let deletedItem = await ctx.prisma.bag.deleteMany({
        where: {
          id: input.id,
          cartId: cartId
        }
      });

      return deletedItem;
    })
});
