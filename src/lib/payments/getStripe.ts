import { env } from '@fck/env';
import { type Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
    );
  }
  return stripePromise;
};

export default getStripe;
