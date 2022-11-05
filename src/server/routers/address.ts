import { router, protectedProcedure } from '../trpc';
import { getBuyerId } from '@/server/functions/identity';
import { addressInput, addressInputWithId } from '../schema';
import { z } from 'zod';

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
  }),
  update: protectedProcedure.input(addressInputWithId).mutation(async ({ input, ctx }) => {
    let address = await ctx.prisma.address.findUnique({
      where: {
        id: input.id
      }
    });

    if (!address?.isDefault && input.isDefault) {
      let buyerId = await getBuyerId(ctx);
      if (!buyerId) return null;

      await ctx.prisma.address.updateMany({
        where: {
          isDefault: true
        },
        data: {
          isDefault: false
        }
      });
    }

    let updatedAddress = await ctx.prisma.address.update({
      where: {
        id: input.id
      },
      data: {
        isDefault: input.isDefault,
        unitNumber: input.unitNumber,
        StreetNumber: input.StreetNumber,
        addressLine1: input.addressLine1,
        addressLine2: input.addressLine2,
        city: input.city,
        postalCode: input.postalCode,
        region: input.region,
        country: input.country
      }
    });

    return updatedAddress;
  }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      let buyerId = await getBuyerId(ctx);
      if (!buyerId) return null;

      let deletedAddress = await ctx.prisma.address.deleteMany({
        where: {
          id: input.id,
          buyerId: buyerId
        }
      });

      return deletedAddress;
    })
});
