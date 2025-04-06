import { postRouter } from "@fck//server/api/routers/post";
import { createTRPCRouter } from "@fck/server/trpc/trpc";
import { stripeRouter } from "./routers/stripe";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  stripe: stripeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
