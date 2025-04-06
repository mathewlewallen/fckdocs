import { VercelToolbar } from '@vercel/toolbar/next';
import { env } from '@fck/env';

export const Toolbar = () => (env.FLAGS_SECRET ? <VercelToolbar /> : null);
