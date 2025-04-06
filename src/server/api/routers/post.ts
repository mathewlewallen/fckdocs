import {
  createTRPCRouter,
  publicProcedure,
} from "@fck/server/trpc/trpc";
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import type { db } from '@fck/server/db';
import type { Prisma } from '@prisma/client';

const defaultPostSelect = {
  id: true,
  title: true,
  text: true,
  name: true,
  user_id: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.PostSelect;

export const postRouter = createTRPCRouter({
  list: publicProcedure
    .input(z.object({ 
      text: z.string(),
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.string().nullish(),
    }))
    .query(async ({ input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const items = await db.post.findMany({
        select: defaultPostSelect,
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: {},
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        // Remove the last item and use it as next cursor

        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        items: items.reverse(),
        nextCursor,
      };
    }),
    byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const post = await db.post.findUnique({
        where: { id },
        select: defaultPostSelect,
      });
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${id}'`,
        });
      }
      return post;
    }),
  add: publicProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        title: z.string().min(1).max(32),
        text: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const post = await db.post.create({
        data: input,
        select: defaultPostSelect,
      });
      return post;
    }),
});
