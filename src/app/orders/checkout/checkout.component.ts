import { Component, inject } from '@angular/core';
import { CartItemStoreService } from '../../services/cartItemStore.service';
import { Router } from '@angular/router';
import { CartItem } from '../../../models/cartItems/cartItem.model';
import { CartUtilService } from '../../services/cartUtil.service';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  //----> Stores
  cartUtilStore = inject(CartUtilService);
  cartItemStoreService = inject(CartItemStoreService);
  router = inject(Router);

  //----> State
  carts = this.cartItemStoreService.cartItems;

  makePayment() {
    this.cartItemStoreService.editAllCatItems(this.carts());
    this.router.navigateByUrl('/orders/payment');
  }

  backToCart() {
    this.router.navigateByUrl('/orders/cart');
  }

  subTotal(cart: CartItem) {
    return this.cartUtilStore.subTotal(cart);
  }

  total() {
    return this.cartUtilStore.totalPrice(this.carts());
  }
}
