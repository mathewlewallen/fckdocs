import 'server-only';
import { env } from '@fck/env';
import Stripe from 'stripe';

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
});

export type { Stripe } from 'stripe';
