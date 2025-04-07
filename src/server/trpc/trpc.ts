import { currentUser } from '@clerk/nextjs/server';
import { TRPCError, initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { redis } from '@fck/lib/redis';
import { resend } from '@fck/lib/resend';
import { db } from '@fck/server/db';

export const createTRPCContext = (opts: { headers: Headers }) => {
  return {
    db,
    resend,
    redis,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const mergeTRPCRouters = t.mergeRouters;

export const protectedProcedure = t.procedure.use(async ({ next }) => {
  const user = await currentUser();

  if (!user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      user: { ...user },
    },
  });
});
