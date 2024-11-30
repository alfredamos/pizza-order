import { Component, input, output, signal } from '@angular/core';
import { CartItem } from '../../../models/orders/cartItem.model';

@Component({
  selector: 'app-pizza-add-to-cart-confirmation',
  imports: [],
  templateUrl: './pizza-add-to-cart-confirmation.component.html',
  styleUrl: './pizza-add-to-cart-confirmation.component.css',
})
export class PizzaAddToCartConfirmationComponent {
  carts = input.required<CartItem[]>();
  total = signal(0);
  subTotal = signal(0);

  onAddToCart = output<CartItem[]>();
  onBackToPizza = output<void>();
  onDecreaseQuantity = output<string>();
  onIncreaseQuantity = output<string>();

  addToCart(carts: CartItem[]) {
    this.onAddToCart.emit(carts);
  }

  backToPizza() {
    this.onBackToPizza.emit();
  }

  decreaseQuantity(cartId: string) {
    this.onDecreaseQuantity.emit(cartId);
  }

  increaseQuantity(cartId: string) {
    this.onIncreaseQuantity.emit(cartId);
  }

  calculateTotal(cart: CartItem) {
    this.subTotal.set(cart?.price * cart?.quantity);
    this.total.update((oldTotal) => oldTotal + this.subTotal());
    if (Number.isNaN(this.total())) this.total.set(Number(''));
  }
}
