import { Knock } from '@knocklabs/node';
import { env } from '@fck/env';

const key = env.KNOCK_SECRET_API_KEY;

export const notifications = new Knock(key);
