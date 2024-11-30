import { Component, input, output } from '@angular/core';
import { CartItem } from '../../../models/cartItems/cartItem.model';
import { ModalAlertComponent } from '../../util/modal-alert/modal-alert.component';
import { PizzaAddToCartConfirmationComponent } from '../pizza-add-to-cart-confirmation/pizza-add-to-cart-confirmation.component';

@Component({
  selector: 'app-add-pizza-item',
  imports: [ModalAlertComponent, PizzaAddToCartConfirmationComponent],
  templateUrl: './add-pizza-item.component.html',
  styleUrl: './add-pizza-item.component.css',
})
export class AddPizzaItemComponent {
  isAddToCart = input.required<boolean>();
  carts = input.required<CartItem[]>();

  onAddToCart = output<CartItem[]>();
  onBackToList = output<void>();
  onIncreaseQuantity = output<string>();
  onDecreaseQuantity = output<string>();

  addToCart(carts: CartItem[]) {
    this.onAddToCart.emit(carts);
  }

  backToList() {
    this.onBackToList.emit();
  }

  decreaseQuantity(cartId: string) {
    this.onDecreaseQuantity.emit(cartId);
  }

  increaseQuantity(cartId: string) {
    this.onIncreaseQuantity.emit(cartId);
  }
}
