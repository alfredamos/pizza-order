import { computed, Injectable, signal } from '@angular/core';
import { CartItemState } from '../../models/cartItems/cartItem.state';
import { CartItem } from '../../models/cartItems/cartItem.model';

@Injectable({
  providedIn: 'root',
})
export class CartItemStoreService {
  private cartItemState = signal<CartItemState>({ ...new CartItemState() });
  stateCartItem = this.cartItemState.asReadonly();

  cartItems = computed(() => this.stateCartItem()?.cartItems);
  isAddToCart = computed(() => this.stateCartItem()?.isAddToCart);

  addCartItem(cart: CartItem) {
    const newCartItems = [...this.cartItemState()?.cartItems, cart];
    this.cartItemState.update((cartState) => ({
      ...cartState,
      cartItems: newCartItems,
    }));
  }

  deleteCartItem(cartId: string) {
    const newCartItems = this.cartItemState()?.cartItems?.filter(
      (cart) => cart.id !== cartId
    );
    this.cartItemState.update((cartState) => ({
      ...cartState,
      cartItems: newCartItems,
    }));
  }

  editCartItem(cart: CartItem) {
    const newCartItems = this.cartItemState()?.cartItems?.map((cartItem) =>
      cartItem.id === cart.id ? cart : cartItem
    );
    this.cartItemState.update((cartState) => ({
      ...cartState,
      cartItems: newCartItems,
    }));
  }

  editAllCatItems(carts: CartItem[]) {
    this.cartItemState.update((cartState) => ({
      ...cartState,
      cartItems: carts,
    }));
  }

  changeIsAddToCart(isAddCart: boolean) {
    this.cartItemState.update((cartState) => ({
      ...cartState,
      isAddToCart: isAddCart,
    }));
  }

  setCartItemsLocal(carts: CartItem[]) {
    localStorage.setItem('carts', JSON.stringify(carts));
  }

  getCartItemsLocal() {
    return JSON.parse(localStorage.getItem('carts')!) as CartItem[];
  }

  removeCartItemsLocal() {
    localStorage.removeItem('carts');
  }
}
