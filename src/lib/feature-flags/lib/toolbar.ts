import { env } from '@fck/env';
import { withVercelToolbar } from '@vercel/toolbar/plugins/next';

export const withToolbar = (config: object) =>
  env.FLAGS_SECRET ? withVercelToolbar()(config) : config;
