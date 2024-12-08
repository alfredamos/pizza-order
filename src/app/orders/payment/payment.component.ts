import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemStoreService } from '../../services/cartItemStore.service';
import { CartUtilService } from '../../services/cartUtil.service';
import { StripeService } from '../../services/stripePay.service';
import { OrderPayload } from '../../../models/auth/orderPayload.model';
import { AuthStoreService } from '../../services/authStore.service';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  authStoreService = inject(AuthStoreService);
  cartItemStoreService = inject(CartItemStoreService);
  cartUtilService = inject(CartUtilService);
  router = inject(Router);
  stripeService = inject(StripeService);

  carts = this.cartItemStoreService.cartItems;

  totalPrice = computed(() => this.cartUtilService.totalPrice(this.carts()));
  totalQuantity = computed(() =>
    this.cartUtilService.totalQuantity(this.carts())
  );
  userId = this.authStoreService.currentUser()?.id;

  initiateStripe() {
    const orderPayload = this.makeOrder();
    this.stripeService.redirectToCheckout(orderPayload);
  }

  private makeOrder(): OrderPayload {
    const orderPayload: OrderPayload = {
      ...new OrderPayload(),
      cartItems: this.carts(),
      totalPrice: this.totalPrice(),
      totalQuantity: this.totalQuantity(),
      userId: this.userId,
      orderDate: new Date(),
    };

    return orderPayload;
  }
}
