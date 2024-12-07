import { Injectable } from '@angular/core';
import { stripeLoader } from '../util/stripe.util';
import { Stripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
//import {toSignal} from "rxjs/"

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  stripePromise: Promise<Stripe> | undefined;

  constructor(private http: HttpClient) {
    this.stripePromise = this.loadStripe();
  }
  confirmPayment(amount: number) {
    /* return  const results = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `http://localhost:3000/orders/payment-success?amount=${totalPrice}`,
        },
         redirect: "if_required",
      }); */
  }

  async redirectToCheckout(data: any): Promise<Stripe> {
    const stripe = await this.stripePromise;

    /*  const response$ = this.http.post<Stripe>(`${environment.apiUrl}/api/create-checkout-session`, data);
    const {session} = await firstValueFrom(response$); */

    const response = await fetch(
      `${environment.apiUrl}/api/create-checkout-session`,
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
