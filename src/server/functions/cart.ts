import { Context } from '../context';
import { getCartId } from './identity';

export async function getCartItemsPrice(ctx: Context) {
  let cartId = await getCartId(ctx);
  if (!cartId) return null;

  let cart = await ctx.prisma.bag.findMany({
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

  return price.toFixed(2);
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
      productId: true,
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
          image: true,
          seller: {
            select: {
              id: true
            }
          }
        }
      }
    }
  });

  if (!bags.length) return null;

  let flattenedBag = bags.map((e) => {
    let bag = {
      id: e.id,
      itemCount: e.itemCount,
      priceInCents: e.item.priceInCents,
      title: e.item.title,
      sellerId: e.item.seller.id,
      image: e.item.image
    };
    return bag;
  });

  type Bag = {
    id: number;
    itemCount: number;
    priceInCents: string;
    title: string;
    sellerId: string;
    image: string;
  };

  let reduce = flattenedBag.reduce((bag: Record<string, Bag[]>, item, i) => {
    bag[item.sellerId] = bag[item.sellerId] || [];
    bag[item.sellerId].push(item);
    return bag;
  }, {});

  let groupedBySeller = Object.entries(reduce).map(([sellerId, items]) => ({ sellerId, items }));

  return groupedBySeller;
}
