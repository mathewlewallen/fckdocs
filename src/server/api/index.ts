import {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from '@fck/server/trpc/trpc';
import { postRouter } from './routers/post';

export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(() => 'ok'),
  post: postRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
