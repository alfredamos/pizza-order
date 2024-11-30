import { Component, signal, inject, effect } from '@angular/core';
import { Pizza } from '../../../models/pizzas/pizza.model';
import { AddPizzaItemComponent } from '../add-pizza-item/add-pizza-item.component';
import { CartItem } from '../../../models/cartItems/cartItem.model';
import { PizzaStoreService } from '../../services/pizzaStore.service';
import { Router, RouterLink } from '@angular/router';
import { CartItemStoreService } from '../../services/cartItemStore.service';

@Component({
  selector: 'app-list-pizza',
  imports: [RouterLink, AddPizzaItemComponent],
  templateUrl: './list-pizza.component.html',
  styleUrl: './list-pizza.component.css',
})
export class ListPizzaComponent {
  cartItemStoreService = inject(CartItemStoreService);
  pizzaStoreService = inject(PizzaStoreService);
  router = inject(Router);

  pizzas = this.pizzaStoreService?.pizzas;
  cartItems = this.cartItemStoreService?.cartItems;

  pizzaEffect = effect(() => console.log('pizzas : ', this.pizzas()));

  isAddToCart = signal(false);

  addToCart(pizza: Pizza) {
    console.log('Add to cart');
    this.isAddToCart.set(!this.isAddToCart());
    //setIsAddToCart((previous) => !previous);
  }

  backToList() {
    console.log('You must close now!!!');
    this.isAddToCart.set(false);
    //this.router.resetConfig
  }

  decreaseQuantity(cartId: string) {
    console.log('Decrease quantity of cart-id : ', cartId);

    const newCartItems = this.cartItems()
      ?.map((cart) => {
        if (cart.id === cartId) {
          const newCart = {
            ...cart,
            quantity: cart.quantity <= 1 ? 1 : cart.quantity - 1,
          };
          if (cart?.quantity === 0)
            this.cartItemStoreService.deleteCartItem(cart.id);
          //dispatch(deleteCartItem({ cartItemId: cart.id }));
          if (cart?.quantity > 0)
            this.cartItemStoreService.editCartItem(newCart); //dispatch(editCartItem({ cartItem: newCart }));

          return newCart;
        }

        return cart;
      })
      .filter((cart) => cart?.quantity !== 0) as CartItem[];

    localStorage.setItem('carts', JSON.stringify(newCartItems));
  }

  increaseQuantity(cartId: string) {
    console.log('Increase quantity of cart-id : ', cartId);

    const newCartItems = this.cartItems()?.map((cart) => {
      if (cart.id === cartId) {
        const newCart = {
          ...cart,
          quantity: cart.quantity >= 19 ? 20 : cart.quantity + 1,
        };
        this.cartItemStoreService.editCartItem(newCart);
        //dispatch(editCartItem({ cartItem: newCart }));

        return newCart;
      }

      return cart;
    }) as CartItem[];

    localStorage.setItem('carts', JSON.stringify(newCartItems));
  }

  toCart(carts: CartItem[]) {}
}
