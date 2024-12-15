import { inject, Injectable } from '@angular/core';
import { CartItem } from '../../models/cartItems/cartItem.model';
import { Pizza } from '../../models/pizzas/pizza.model';
import { v4 as uuidv4 } from 'uuid';
import { CartItemStoreService } from './cartItemStore.service';
import { OrderPayload } from '../../models/orders/orderPayload.model';

@Injectable({
  providedIn: 'root',
})
export class CartUtilService {
  cartItemStoreService = inject(CartItemStoreService);

  makeCartItems(pizza: Pizza, carts: CartItem[]) {
    const cart = this.findCartItem(pizza, carts)!;

    let cartItem: CartItem | undefined;
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

  makeOrder(userId: string,carts: CartItem[]): OrderPayload {
      const orderPayload: OrderPayload = {
        id: uuidv4(),
        paymentId: '',
        cartItems: carts,
        totalPrice: this.totalPrice(carts),
        totalQuantity: this.totalQuantity(carts),
        userId: userId,
        orderDate: new Date(),
      };

      return orderPayload;
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

  removeItem(cartId: string, carts: CartItem[]) {
    const newCartItems = carts?.filter((cart) => {
      if (cart.id === cartId) {
        this.cartItemStoreService.deleteCartItem(cart.id);
        return;
      }

      return cart;
    }) as CartItem[];

    this.cartItemStoreService.editAllCatItems(newCartItems);
  }

  totalPrice(carts: CartItem[]) {
    return carts?.reduce(
      (sum, current) => sum + current.price * current.quantity,
      0
    );
  }

  totalQuantity(carts: CartItem[]) {
    return carts?.reduce((sum, current) => sum + current.quantity, 0);
  }
}
