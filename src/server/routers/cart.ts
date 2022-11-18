import { router, protectedProcedure } from '../trpc';
import { getBuyerId, getCartId } from '@/server/functions/identity';
import { getSelectedCartItems, getCartItemsPrice } from '@/server/functions/cart';
import { getProductStock } from '../functions/product';
import { quantityInput } from '../schema';
import { z } from 'zod';

export const cartRouter = router({
  getItemCount: protectedProcedure.query(async ({ ctx }) => {
    let cartId = await getCartId(ctx);
    if (!cartId) return null;

    let items = await ctx.prisma.bag.aggregate({
      where: {
        cartId: cartId,
        checkedOut: false
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
          where: {
            checkedOut: false
          },
          select: {
            selected: true,
            id: true,
            itemCount: true,
            productId: true,
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

      let stock = await getProductStock(ctx, input.id);
      if (!stock) return null;

      let cartItem = await ctx.prisma.bag.findFirst({
        where: {
          productId: input.id,
          cartId: cartId,
          checkedOut: false
        }
      });

      if (!cartItem) {
        let quantity = input.quantity <= stock ? input.quantity : stock;
        let newBagItem = await ctx.prisma.bag.create({
          data: {
            cartId: cartId,
            itemCount: quantity,
            productId: input.id
          }
        });

        return newBagItem;
      }

      if (cartItem?.itemCount < stock) {
        let updatedItem = await ctx.prisma.bag.updateMany({
          where: {
            cartId: cartId,
            productId: input.id,
            checkedOut: false
          },
          data: {
            itemCount: { increment: input.quantity }
          }
        });
        return updatedItem;
      }

      return 'stock_limit';
    }),
  toggleBagSelect: protectedProcedure
    .input(z.object({ bagId: z.number(), isSelected: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      let cartId = await getCartId(ctx);
      if (!cartId) return null;

      let selected = await ctx.prisma.bag.updateMany({
        where: {
          id: input.bagId,
          checkedOut: false,
          cartId: cartId
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
          cartId: cartId,
          checkedOut: false
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
  incrementItemCount: protectedProcedure.input(quantityInput).mutation(async ({ input, ctx }) => {
    let cartId = await getCartId(ctx);
    if (!cartId) return null;

    let stock = await getProductStock(ctx, input.productId);
    if (!stock) return null;

    if (input.value < stock) {
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
    }

    return 'stock_limit';
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

  updateItemCount: protectedProcedure.input(quantityInput).mutation(async ({ input, ctx }) => {
    let cartId = await getCartId(ctx);
    if (!cartId) return null;

    let stock = await getProductStock(ctx, input.productId);
    if (!stock) return null;

    if (input.value < stock) {
      let updatedCount = await ctx.prisma.bag.update({
        where: {
          id: input.id
        },
        data: {
          itemCount: input.value
        }
      });

      return updatedCount;
    }

    return 'stock_limit';
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
