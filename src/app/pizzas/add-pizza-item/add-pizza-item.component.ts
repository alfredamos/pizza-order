import { Component, inject, input, output } from '@angular/core';
import { CartItem } from '../../../models/cartItems/cartItem.model';
import { ModalAlertComponent } from '../../util/modal-alert/modal-alert.component';
import { PizzaAddToCartConfirmationComponent } from '../pizza-add-to-cart-confirmation/pizza-add-to-cart-confirmation.component';
import { CartItemStoreService } from '../../services/cartItemStore.service';

@Component({
  selector: 'app-add-pizza-item',
  imports: [ModalAlertComponent, PizzaAddToCartConfirmationComponent],
  templateUrl: './add-pizza-item.component.html',
  styleUrl: './add-pizza-item.component.css',
})
export class AddPizzaItemComponent {
  cartItemStoreService = inject(CartItemStoreService);
  isAddToCart = this.cartItemStoreService.isAddToCart;

  onAddToCart = output<CartItem[]>();

  addToCart(carts: CartItem[]) {
    this.onAddToCart.emit(carts);
  }

  backToList() {
    this.cartItemStoreService.changeIsAddToCart(false);
  }
}
