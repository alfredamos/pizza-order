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

  constructor() {
    const carts = this.getLocalStorageCartItems();

    if (carts?.length) {
      this.editAllCatItems(carts);
    }
  }

  addCartItem(cart: CartItem) {
    const newCartItems = [...this.cartItemState()?.cartItems, cart];
    this.cartItemState.update((cartState) => ({
      ...cartState,
      cartItems: newCartItems,
    }));

    this.setLocalStorageCartItems(newCartItems);
  }

  deleteCartItem(cartId: string) {
    const newCartItems = this.cartItemState()?.cartItems?.filter(
      (cart) => cart.id !== cartId
    );
    this.cartItemState.update((cartState) => ({
      ...cartState,
      cartItems: newCartItems,
    }));

    this.setLocalStorageCartItems(newCartItems);
  }

  editCartItem(cart: CartItem) {
    const newCartItems = this.cartItemState()?.cartItems?.map((cartItem) =>
      cartItem.id === cart.id ? cart : cartItem
    );
    this.cartItemState.update((cartState) => ({
      ...cartState,
      cartItems: newCartItems,
    }));

    this.setLocalStorageCartItems(newCartItems);
  }

  editAllCatItems(carts: CartItem[]) {
    this.cartItemState.update((cartState) => ({
      ...cartState,
      cartItems: carts,
    }));

    this.setLocalStorageCartItems(carts);
  }

  changeIsAddToCart(isAddCart: boolean) {
    this.cartItemState.update((cartState) => ({
      ...cartState,
      isAddToCart: isAddCart,
    }));
  }

  setLocalStorageCartItems(carts: CartItem[]) {
    localStorage.setItem('carts', JSON.stringify(carts));
  }

  getLocalStorageCartItems() {
    return JSON.parse(localStorage.getItem('carts')!) as CartItem[];
  }

  removeLocalStorageCartItems() {
    localStorage.removeItem('carts');
  }
}
