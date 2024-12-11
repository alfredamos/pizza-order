import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartItemStoreService } from '../../services/cartItemStore.service';
import { CartUtilService } from '../../services/cartUtil.service';
import { StripeService } from '../../services/stripePay.service';
import { OrderPayload } from '../../../models/orders/orderPayload.model';
import { AuthStoreService } from '../../services/authStore.service';
import { v4 as uuidv4 } from 'uuid';
import { CartItem } from '../../../models/cartItems/cartItem.model';

@Component({
  selector: 'app-payment',
  imports: [RouterLink],
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
    this.stripeService.checkout(orderPayload);
    
  }

  subTotal(cart: CartItem) {
    return this.cartUtilService.subTotal(cart);
  }

  private makeOrder(): OrderPayload {
    const orderPayload: OrderPayload = {
      id: uuidv4(),
      paymentId: '',
      cartItems: this.carts(),
      totalPrice: this.totalPrice(),
      totalQuantity: this.totalQuantity(),
      userId: this.userId,
      orderDate: new Date(),
    };

    return orderPayload;
  }
}
