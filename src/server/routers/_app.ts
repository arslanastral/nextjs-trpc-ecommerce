import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { addressRouter } from './address';
import { identityRouter } from './identity';

export const appRouter = router({
  address: addressRouter,
  identity: identityRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
