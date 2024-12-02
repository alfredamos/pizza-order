import { Component, inject } from '@angular/core';
import { CartItemStoreService } from '../../services/cartItemStore.service';
import { Router } from '@angular/router';
import { CartItem } from '../../../models/cartItems/cartItem.model';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  cartItemStoreService = inject(CartItemStoreService);
  router = inject(Router);

  carts = this.cartItemStoreService.cartItems;

  makePayment = () => {
    this.router.navigateByUrl('/orders/payment');
  };

  backToCart = () => {
    this.router.navigateByUrl('/orders/cart');
  };

  subTotal(cart: CartItem) {
    return cart.quantity * cart.price;
  }

  total() {
    return this.carts()?.reduce(
      (sum, current) => sum + current.price * current.quantity,
      0
    );
  }
}
