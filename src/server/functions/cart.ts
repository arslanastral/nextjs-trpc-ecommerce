import { Context } from '../context';
import { getCartId } from './identity';

export async function getCartItemsPrice(ctx: Context) {
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
}

export async function getSelectedCartItems(ctx: Context) {
  let cartId = await getCartId(ctx);
  if (!cartId) return null;

  let bags = await ctx.prisma.bag.findMany({
    where: {
      cartId: cartId,
      selected: true,
      checkedOut: false,
      item: {
        stock: {
          gt: 0
        }
      }
    },
    select: {
      id: true,
      itemCount: true,
      item: {
        select: {
          image: true,
          title: true,
          priceInCents: true,
          seller: {
            select: {
              storeName: true
            }
          }
        }
      }
    }
  });

  return bags;
}

export async function getSelectedOrderItems(ctx: Context) {
  let cartId = await getCartId(ctx);
  if (!cartId) return null;

  let bags = await ctx.prisma.bag.findMany({
    where: {
      cartId: cartId,
      selected: true,
      checkedOut: false,
      item: {
        stock: {
          gt: 0
        }
      }
    },
    select: {
      id: true,
      itemCount: true,
      item: {
        select: {
          title: true,
          priceInCents: true,
          seller: {
            select: {
              id: true
            }
          }
        }
      }
    }
  });

  return bags;
}
