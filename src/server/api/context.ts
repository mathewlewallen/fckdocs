import { auth } from '@clerk/nextjs/server';
import type * as trpcNext from '@trpc/server/adapters/next';

type CreateContextOptions = {
  auth: Awaited<ReturnType<typeof auth>>;
};

export async function createContextInner(_opts: CreateContextOptions) {
  return {};
}

export type Context = Awaited<ReturnType<typeof createContextInner>>;

export async function createContext(
  opts: trpcNext.CreateNextContextOptions
): Promise<Context> {
  const session = await auth();
  return await createContextInner({ auth: session });
}
