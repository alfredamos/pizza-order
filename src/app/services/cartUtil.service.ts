import { inject, Injectable } from '@angular/core';
import { CartItem } from '../../models/cartItems/cartItem.model';
import { Pizza } from '../../models/pizzas/pizza.model';
import { v4 as uuidv4 } from 'uuid';
import { CartItemStoreService } from './cartItemStore.service';

@Injectable({
  providedIn: 'root',
})
export class cartUtilService {
  cartItemStoreService = inject(CartItemStoreService);

  makeCartItems(pizza: Pizza, carts: CartItem[]) {
    const cart = this.findCartItem(pizza, carts)!;

    let cartItem: CartItem;
    let allCartItems: CartItem[] = [];
    let cartItems: CartItem[] = [...carts];

    if (cart?.quantity > 0) {
      let quantity = Number(cart.quantity);
      cartItem = { ...cart, quantity: quantity + 1 };
      const newCartItems = cartItems?.filter((carte) =>
        carte?.id !== cart?.id ? cartItem : carte
      );
      this.cartItemStoreService.editCartItem(cartItem);

      allCartItems = [...newCartItems, cartItem];

      return { cartItems: allCartItems };
    } else if (!cart) {
      cartItem = {
        id: uuidv4(),
        name: pizza.name,
        price: pizza.price,
        quantity: 1,
        pizzaId: pizza.id,
        orderId: '',
        image: pizza.image,
      };

      this.cartItemStoreService.addCartItem(cartItem);

      allCartItems = [...cartItems, cartItem];
    }

    return { cartItems: allCartItems };
  }

  findCartItem(pizza: Pizza, carts: CartItem[]) {
    return carts?.find((cartItem) => cartItem?.pizzaId === pizza.id);
  }
}
