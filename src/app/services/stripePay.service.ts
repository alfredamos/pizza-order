import { Injectable} from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { OrderPayload } from '../../models/orders/orderPayload.model';
import { Session } from '../../models/stripe/session.model';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  stripePromise: Promise<Stripe> | undefined;

  constructor(private http: HttpClient) {
    this.stripePromise = this.loadStripe();
  }

  async checkout(order: OrderPayload) {
    const stripe = await this.stripePromise;

    const response$ = this.http.post<Session>(
      `${environment.apiUrl}/stripe/checkout`,
      order
    );
    const session = await firstValueFrom(response$);

    console.log('In stripe-service, response : ', session);

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      console.error(result.error.message);
    }

    return session;
  }

  async redirectToCheckout(orderPayload: OrderPayload): Promise<Stripe> {
    const stripe = await this.stripePromise;

    const response = await fetch(`${environment.apiUrl}/stripe/checkout`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(orderPayload),
    });

    const session = await response.json();

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      console.error(result.error.message);
    }

    return session;
  }

  private loadStripe(): Promise<Stripe> {
    return loadStripe(environment.stripe_publishable_key!) as Promise<Stripe>;
  }
}
