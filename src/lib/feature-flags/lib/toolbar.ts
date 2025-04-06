import { withVercelToolbar } from '@vercel/toolbar/plugins/next';
import { env } from '@fck/env';

export const withToolbar = (config: object) =>
  env.FLAGS_SECRET ? withVercelToolbar()(config) : config;
