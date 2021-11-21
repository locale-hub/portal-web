import { Injectable } from '@angular/core';
import {loadStripe, PaymentMethod, Stripe, StripeCardElement, StripeCardElementOptions, StripeError} from '@stripe/stripe-js';
import {environment} from '../../../environments/environment';

interface CardResponse {
  paymentMethod?: PaymentMethod;
  error?: StripeError;
}

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  private static instance: Stripe;

  cardStyle: StripeCardElementOptions = {
    style: {
      base: {
        ':focus': {
          color: 'white',
        },
      },
      complete: {
        color: 'white',
      },
    },
  };

  public async Instance(): Promise<Stripe> {
    if (undefined === StripeService.instance) {
      StripeService.instance = await loadStripe(environment.stripe.apiKey);
    }
    return StripeService.instance;
  }

  public async createPaymentMethod(card: StripeCardElement): Promise<CardResponse> {
    return StripeService.instance
      .createPaymentMethod({
        type: 'card',
        card,
      });
  }
}
