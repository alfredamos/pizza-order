import { Component, inject, input, output, signal } from '@angular/core';
import { CartItem } from '../../../models/cartItems/cartItem.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlus, heroMinus } from '@ng-icons/heroicons/outline';
import { CartItemStoreService } from '../../services/cartItemStore.service';

@Component({
  selector: 'app-pizza-add-to-cart-confirmation',
  imports: [NgIcon],
  templateUrl: './pizza-add-to-cart-confirmation.component.html',
  styleUrl: './pizza-add-to-cart-confirmation.component.css',
  viewProviders: [provideIcons({ heroPlus, heroMinus })],
})
export class PizzaAddToCartConfirmationComponent {
  cartItemStoreService = inject(CartItemStoreService);

  carts = this.cartItemStoreService?.cartItems;
  onAddToCart = output<CartItem[]>();

  addToCart(carts: CartItem[]) {
    console.log('go back!!!');
    this.onAddToCart.emit(carts);
  }

  backToPizza() {
    this.cartItemStoreService.changeIsAddToCart(false);
  }

  quantityIncrease(cart: CartItem) {
    console.log('Quantity is increased');
    const newCart = {
      ...cart,
      quantity: cart.quantity >= 19 ? 20 : cart.quantity + 1,
    };

    this.cartItemStoreService.editCartItem(newCart);
  }

  quantityDecrease(cart: CartItem) {
    console.log('Quantity is decreased');

    const newCart = {
      ...cart,
      quantity: cart.quantity <= 1 ? 1 : cart.quantity - 1,
    };
    if (cart?.quantity === 0) this.cartItemStoreService.deleteCartItem(cart.id);

    if (cart?.quantity > 0) this.cartItemStoreService.editCartItem(newCart);
  }

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
