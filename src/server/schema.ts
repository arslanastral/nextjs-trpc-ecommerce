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

export const productInput = z.object({
  title: z
    .string()
    .min(1, { message: 'Product must have a title' })
    .max(50, { message: 'Product title must be under 50 characters' }),
  price: z.number().min(1, { message: 'Product must have a price' }),
  stock: z
    .number()
    .min(10, { message: 'Stock must be atleast 10' })
    .max(100, { message: 'Stock must be under 100' }),
  category: z
    .string()
    .min(1, { message: 'Product must have a category' })
    .max(1, { message: 'Uknown Product category' }),
  description: z
    .string()
    .min(1, { message: 'Product must have a description' })
    .max(280, { message: 'Product description must be under 280 characters' }),
  image: z.string().min(1, { message: 'Product must have a image' })
});

export const productInputWithId = productInput.extend({
  id: z.string(),
  imageId: z.string()
});

export const quantityInput = z.object({
  id: z.number().min(1),
  productId: z.string().min(1),
  value: z.number().min(1)
});

export const statusUpdateInput = z.object({
  orderStatus: z.enum([
    'PACKED',
    'SHIPPED',
    'OUTFORDELIVERY',
    'DELIVERED',
    'OUTOFSTOCK',
    'SELLERCANCELLED'
  ])
});

export const statusUpdateInputWithId = statusUpdateInput.extend({
  id: z.string().min(1)
});

export type SellerInfo = z.infer<typeof sellerInfoInput>;
export type Address = z.infer<typeof addressInput>;
export type AddressWithId = z.infer<typeof addressInputWithId>;
export type Product = z.infer<typeof productInput>;
export type ProductWithId = z.infer<typeof productInputWithId>;
export type StatusUpdateInput = z.infer<typeof statusUpdateInput>;
