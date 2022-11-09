import { publicProcedure, router } from '../trpc';
import { addressRouter } from './address';
import { identityRouter } from './identity';
import { productRouter } from './product';

export const appRouter = router({
  address: addressRouter,
  identity: identityRouter,
  productRouter: productRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
