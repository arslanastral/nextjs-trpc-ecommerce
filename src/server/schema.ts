import { z } from 'zod';

export const addressInput = z.object({
  isDefault: z.boolean().optional(),
  unitNumber: z.string().optional(),
  StreetNumber: z.string().optional(),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  city: z.string(),
  postalCode: z.string(),
  region: z.string(),
  country: z.string()
});

export const sellerInfoInput = z.object({
  storeName: z.string().optional(),
  storeEmail: z.string().optional()
});

export type SellerInfo = z.infer<typeof sellerInfoInput>;
