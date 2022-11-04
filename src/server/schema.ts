import { z } from 'zod';

export const sellerInfoInput = z.object({
  storeName: z.string().optional(),
  storeEmail: z.string().optional()
});

export type SellerInfo = z.infer<typeof sellerInfoInput>;
