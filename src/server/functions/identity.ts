import { Context } from '../context';
import { SellerInfo } from '../schema';

export async function getBuyerId(ctx: Context) {
  if (!ctx.session?.user?.id) return null;

  const buyerId = await ctx.prisma.buyer.upsert({
    where: {
      userId: ctx.session?.user?.id
    },
    update: {},
    create: {
      userId: ctx.session?.user?.id
    }
  });

  return buyerId.id;
}

export async function getSellerId(ctx: Context) {
  if (!ctx.session?.user?.id) return null;
  if (!ctx.session?.user?.email) return null;

  const sellerId = await ctx.prisma.seller.upsert({
    where: {
      userId: ctx.session?.user?.id
    },
    update: {},
    create: {
      userId: ctx.session?.user?.id,
      storeEmail: ctx.session?.user?.email,
      storeName: `${ctx.session?.user?.name}'s Store`
    }
  });

  return sellerId.id;
}

export async function updateSellerInfo(input: SellerInfo, ctx: Context) {
  if (!ctx.session?.user?.id) return null;

  let updatedSellerInfo = await ctx.prisma.seller.update({
    where: {
      userId: ctx.session?.user?.id
    },
    data: {
      storeName: input.storeName,
      storeEmail: input.storeEmail
    }
  });

  let info = {
    storeName: updatedSellerInfo.storeName,
    storeEmail: updatedSellerInfo.storeEmail
  };
  return info;
}
