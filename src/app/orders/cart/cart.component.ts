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
  cartItemStoreService = inject(CartItemStoreService);
  carts = this.cartItemStoreService?.cartItems;

  router = inject(Router);

  increaseQuantity = (cart: CartItem) => {
    console.log('Increase quantity of cart-id : ', cart.id);
    const newCart = {
      ...cart,
      quantity: cart.quantity >= 20 ? 20 : cart.quantity + 1,
    };

    this.cartItemStoreService.editCartItem(newCart);
  };

  decreaseQuantity = (cart: CartItem) => {
    console.log('Decrease quantity of cart-id : ', cart.id);
    const newCart = {
      ...cart,
      quantity: cart.quantity <= 1 ? 1 : cart.quantity - 1,
    };
    if (cart?.quantity === 0)
      this.cartItemStoreService.deleteCartItem(newCart.id); //dispatch(deleteCartItem({ cartItemId: cart.id }));
    if (cart?.quantity > 0) this.cartItemStoreService.editCartItem(newCart); //dispatch(editCartItem({ cartItem: newCart }));
  };

  removePizza = (cartId: string) => {
    console.log('Increase quantity of cart-id : ', cartId);

    const newCartItems = this.carts()?.filter((cart) => {
      if (cart.id === cartId) {
        this.cartItemStoreService.deleteCartItem(cart.id);
        return;
      }

      return cart;
    }) as CartItem[];

    this.cartItemStoreService.editAllCatItems(newCartItems);
  };

  makeCheckout = () => {
    this.router.navigateByUrl('/orders/checkout');
  };

  backToPizzas = () => {
    this.router.navigateByUrl('/');
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
