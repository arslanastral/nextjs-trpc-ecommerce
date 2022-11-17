import { publicProcedure, router } from '../trpc';
import { identityRouter } from './identity';
import { addressRouter } from './address';
import { productRouter } from './product';
import { cartRouter } from './cart';
import { orderRouter } from './order';

export const appRouter = router({
  address: addressRouter,
  identity: identityRouter,
  product: productRouter,
  cart: cartRouter,
  order: orderRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
