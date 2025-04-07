import { env } from '@fck/env';
import { Knock } from '@knocklabs/node';

const key = env.KNOCK_SECRET_API_KEY;

export const notifications = new Knock(key);
