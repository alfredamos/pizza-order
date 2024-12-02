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
  total = signal(0);
  subTotal = signal(0);

  cartItemStoreService = inject(CartItemStoreService);

  carts = this.cartItemStoreService?.cartItems;
  onAddToCart = output<CartItem[]>();
  onBackToPizza = output<void>();

  addToCart(carts: CartItem[]) {
    this.onAddToCart.emit(carts);
  }

  backToPizza() {
    this.onBackToPizza.emit();
  }

  quantityIncrease($event: Event, cart: CartItem) {
    console.log({ $event });

    this.subTotal.set(cart?.price * cart?.quantity);
    this.total.update((oldTotal) => oldTotal + this.subTotal());

    if (Number.isNaN(this.total())) this.total.set(Number(''));

    console.log('Quantity is increased');

    const newCart = {
      ...cart,
      quantity: cart.quantity >= 19 ? 20 : cart.quantity + 1,
    };
    this.cartItemStoreService.editCartItem(newCart);
  }

  quantityDecrease($event: Event, cart: CartItem) {
    $event.stopPropagation();

    this.subTotal.set(cart?.price * cart?.quantity);
    this.total.update((oldTotal) => oldTotal - this.subTotal());

    if (Number.isNaN(this.total())) this.total.set(Number(''));

    console.log('Quantity is decreased');

    const newCart = {
      ...cart,
      quantity: cart.quantity <= 1 ? 1 : cart.quantity - 1,
    };
    if (cart?.quantity === 0) this.cartItemStoreService.deleteCartItem(cart.id);

    if (cart?.quantity > 0) this.cartItemStoreService.editCartItem(newCart);
  }

  /* calculateTotal(cart: CartItem) {
    this.subTotal = cart?.price * cart?.quantity;
    this.total += this.subTotal;
    if (Number.isNaN(this.total)) this.total = Number('');
  } */
}
