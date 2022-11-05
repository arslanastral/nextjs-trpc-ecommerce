import { z } from 'zod';

export const addressInput = z.object({
  isDefault: z.boolean().optional(),
  unitNumber: z.string().optional(),
  StreetNumber: z.string().optional(),
  addressLine1: z
    .string()
    .min(1, { message: 'Address cannot be empty' })
    .max(30, { message: 'Address must be under 30 characters' }),
  addressLine2: z.string().max(30, { message: 'Address must be under 30 characters' }).optional(),
  city: z.string().min(1, { message: 'City cannot be empty' }).max(30),
  postalCode: z.string().max(11, { message: 'Postal code must be under 11 characters' }).nullable(),
  region: z
    .string()
    .min(1, { message: 'Region/State cannot be empty' })
    .max(30, { message: 'Region/State must be under 30 characters' }),
  country: z
    .string()
    .min(1, { message: 'Country cannot be empty' })
    .max(30, { message: 'Country name must be under 30 characters' })
});

export const addressInputWithId = addressInput.extend({
  id: z.string()
});

export const sellerInfoInput = z.object({
  storeName: z.string().optional(),
  storeEmail: z.string().optional()
});

export type SellerInfo = z.infer<typeof sellerInfoInput>;
export type Address = z.infer<typeof addressInput>;
export type AddressWithId = z.infer<typeof addressInputWithId>;
