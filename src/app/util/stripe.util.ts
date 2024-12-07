import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment.dev';

export async function stripeLoader() {
  const stripe = await loadStripe(environment.stripe_publishable_key);

  return stripe;
}
