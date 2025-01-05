import { Component, inject } from '@angular/core';
import { CartItemStoreService } from '../../services/cartItemStore.service';
import { CartItem } from '../../../models/cartItems/cartItem.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroPlus,
  heroMinus,
  heroArrowLeft,
  heroTrash,
} from '@ng-icons/heroicons/outline';
import { Router, RouterLink } from '@angular/router';
import { CartUtilService } from '../../services/cartUtil.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-cart',
  imports: [NgIcon, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  viewProviders: [
    provideIcons({ heroPlus, heroMinus, heroArrowLeft, heroTrash }),
  ],
})
export class CartComponent {
  //----> Stores
  cartUtilService = inject(CartUtilService);
  cartItemStoreService = inject(CartItemStoreService);
  toast = inject(HotToastService);
  carts = this.cartItemStoreService?.cartItems;

  router = inject(Router);

  increaseQuantity(cart: CartItem) {
    console.log('Increase quantity of cart-id : ', cart.id);
    this.cartUtilService.quantityIncrease(cart);

    this.toast.success('Item quantity increased successfully!');
  }

  decreaseQuantity(cart: CartItem) {
    console.log('Decrease quantity of cart-id : ', cart.id);
    this.cartUtilService.quantityDecrease(cart);

    this.toast.success('Item quantity decreased successfully!');
  }

  removePizza(cartId: string) {
    console.log('Increase quantity of cart-id : ', cartId);

    this.cartUtilService.removeItem(cartId, this.carts());

    this.toast.success('Item is removed successfully!');
  }

  makeCheckout() {
    this.toast.success("Order is sent to check-out!")
    this.router.navigateByUrl('/orders/checkout');
  }

  backToPizzas() {
    this.router.navigateByUrl('/');
  }

  subTotal(cart: CartItem) {
    return this.cartUtilService.subTotal(cart);
  }

  total() {
    return this.cartUtilService.totalPrice(this.carts());
  }
}
