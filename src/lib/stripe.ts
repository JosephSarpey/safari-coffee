import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    
    if (!key) {
      console.error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');
      return null;
    }

    if (process.env.NODE_ENV === 'production' && key.startsWith('pk_test_')) {
      console.warn('⚠️ WARNING: You are using a Stripe TEST key in a PRODUCTION environment. Payments will not be processed.');
    }
    if (process.env.NODE_ENV === 'development' && key.startsWith('pk_live_')) {
         console.warn('⚠️ WARNING: You are using a Stripe LIVE key in a DEVELOPMENT environment. Be careful not to make real payments.');
    }
    
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};
