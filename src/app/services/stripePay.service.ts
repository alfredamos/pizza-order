import { Injectable } from '@angular/core';
import { Stripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { OrderPayload } from '../../models/auth/orderPayload.model';

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

    const response$ = this.http.post<Response>(
      `${environment.apiUrl}/stripe-payment/checkout`,
      order
    );
    const response = await firstValueFrom(response$);

    const session = await response.json();

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      console.error(result.error.message);
    }

    return session;
  }

  async redirectToCheckout(data: any): Promise<Stripe> {
    const stripe = await this.stripePromise;

    const response = await fetch(
      `${environment.apiUrl}/stripe-payment/checkout`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

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
    return (window as any).Stripe(environment.stripe_publishable_key);
  }
}
