import { Component, inject, input, output, signal } from '@angular/core';
import { CartItem } from '../../../models/cartItems/cartItem.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlus, heroMinus } from '@ng-icons/heroicons/outline';
import { CartItemStoreService } from '../../services/cartItemStore.service';
import { CartUtilService } from '../../services/cartUtil.service';

@Component({
  selector: 'app-pizza-add-to-cart-confirmation',
  imports: [NgIcon],
  templateUrl: './pizza-add-to-cart-confirmation.component.html',
  styleUrl: './pizza-add-to-cart-confirmation.component.css',
  viewProviders: [provideIcons({ heroPlus, heroMinus })],
})
export class PizzaAddToCartConfirmationComponent {
  cartItemStoreService = inject(CartItemStoreService);
  cartUtilService = inject(CartUtilService);

  carts = this.cartItemStoreService?.cartItems;

  onAddToCart = output<CartItem[]>();

  addToCart(carts: CartItem[]) {
    console.log('go back!!!');
    this.onAddToCart.emit(carts);
  }

  backToPizza() {
    this.cartUtilService.backToPizza();
  }

  quantityIncrease(cart: CartItem) {
    this.cartUtilService.quantityIncrease(cart);
  }

  quantityDecrease(cart: CartItem) {
    this.cartUtilService.quantityDecrease(cart);
  }

  subTotal(cart: CartItem) {
    return this.cartUtilService.subTotal(cart);
  }

  total() {
    return this.cartUtilService.totalPrice(this.carts());
  }
}
