import 'server-only';
import { env } from '@fck/env';
import { auth } from '@fck/server/auth/server';
import { Svix } from 'svix';

const svixToken = env.SVIX_TOKEN;

export const send = async (eventType: string, payload: object) => {
  if (!svixToken) {
    throw new Error('SVIX_TOKEN is not set');
  }

  const svix = new Svix(svixToken);
  const { orgId } = await auth();

  if (!orgId) {
    return;
  }

  return svix.message.create(orgId, {
    eventType,
    payload: {
      eventType,
      ...payload,
    },
    application: {
      name: orgId,
      uid: orgId,
    },
  });
};

export const getAppPortal = async () => {
  if (!svixToken) {
    throw new Error('SVIX_TOKEN is not set');
  }

  const svix = new Svix(svixToken);
  const { orgId } = await auth();

  if (!orgId) {
    return;
  }

  return svix.authentication.appPortalAccess(orgId, {
    application: {
      name: orgId,
      uid: orgId,
    },
  });
};
