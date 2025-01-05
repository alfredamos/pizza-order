import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartItemStoreService } from '../../services/cartItemStore.service';
import { CartUtilService } from '../../services/cartUtil.service';
import { StripeService } from '../../services/stripePay.service';
import { AuthStoreService } from '../../services/authStore.service';
import { CartItem } from '../../../models/cartItems/cartItem.model';
import { HotToastService } from '@ngxpert/hot-toast';

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
  toast = inject(HotToastService);

  carts = this.cartItemStoreService.cartItems;

  totalPrice = computed(() => this.cartUtilService.totalPrice(this.carts()));
  totalQuantity = computed(() =>
    this.cartUtilService.totalQuantity(this.carts())
  );
  userId = this.authStoreService.currentUser()?.id;

  initiateStripe() {
    const orderPayload = this.cartUtilService.makeOrder(
      this.userId,
      this.carts()
    );
    this.stripeService.checkout(orderPayload);

    this.toast.success('Order submitted for payment!');
  }

  subTotal(cart: CartItem) {
    return this.cartUtilService.subTotal(cart);
  }
}
