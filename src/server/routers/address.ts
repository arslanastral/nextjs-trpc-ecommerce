import { router, protectedProcedure } from '../trpc';
import { getBuyerId } from '@/server/functions/identity';
import { addressInput } from '../schema';

export const addressRouter = router({
  create: protectedProcedure.input(addressInput).mutation(async ({ input, ctx }) => {
    let buyerId = await getBuyerId(ctx);
    if (!buyerId) return null;

    let newAddress = await ctx.prisma.address.create({
      data: {
        isDefault: input.isDefault,
        unitNumber: input.unitNumber,
        StreetNumber: input.StreetNumber,
        addressLine1: input.addressLine1,
        addressLine2: input.addressLine2,
        city: input.city,
        postalCode: input.postalCode,
        region: input.region,
        country: input.country,
        buyerId: buyerId
      }
    });

    return newAddress;
  }),

  list: protectedProcedure.query(async ({ ctx }) => {
    let buyerId = await getBuyerId(ctx);
    if (!buyerId) return null;

    let addresses = await ctx.prisma.address.findMany({
      where: {
        buyerId: buyerId
      },
      select: {
        id: true,
        isDefault: true,
        addressLine1: true,
        city: true,
        postalCode: true,
        region: true,
        country: true
      }
    });

    return addresses;
  })
});
