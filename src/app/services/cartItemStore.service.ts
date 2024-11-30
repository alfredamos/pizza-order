import { computed, signal } from "@angular/core";
import { CartItemState } from "../../models/cartItems/cartItem.state";
import { CartItem } from "../../models/orders/cartItem.model";

export class CartItemStoreService {
  private cartItemState = signal<CartItemState>({ ...new CartItemState() });
  stateCartItem = this.cartItemState.asReadonly();

  cartItems = computed(() => this.stateCartItem()?.cartItems);

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
}