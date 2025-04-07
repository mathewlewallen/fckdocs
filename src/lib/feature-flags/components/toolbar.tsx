import { env } from '@fck/env';
import { VercelToolbar } from '@vercel/toolbar/next';

export const Toolbar = () => (env.FLAGS_SECRET ? <VercelToolbar /> : null);
