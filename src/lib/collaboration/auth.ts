import 'server-only';
import { env } from '@fck/env';
import { Liveblocks as LiveblocksNode } from '@liveblocks/node';

const secret = env.LIVEBLOCKS_SECRET;

export type AuthenticateOptions = {
  userId: string;
  orgId: string;
  userInfo: Liveblocks['UserMeta']['info'];
};

export const authenticate = async ({
  userId,
  orgId,
  userInfo,
}: AuthenticateOptions) => {
  if (!secret) {
    throw new Error('LIVEBLOCKS_SECRET is not set');
  }

  const liveblocks = new LiveblocksNode({ secret });

  const session = liveblocks.prepareSession(userId, { userInfo });

  // Allow access to rooms under their org namespace
  session.allow(`${orgId}:*`, session.FULL_ACCESS);

  const { status, body } = await session.authorize();

  return new Response(body, { status });
};
