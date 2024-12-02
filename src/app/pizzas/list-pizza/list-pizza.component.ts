import { Component, inject, OnInit, signal } from '@angular/core';
import { Pizza } from '../../../models/pizzas/pizza.model';
import { AddPizzaItemComponent } from '../add-pizza-item/add-pizza-item.component';
import { CartItem } from '../../../models/cartItems/cartItem.model';
import { PizzaStoreService } from '../../services/pizzaStore.service';
import { Router, RouterLink } from '@angular/router';
import { CartItemStoreService } from '../../services/cartItemStore.service';
import { cartUtilService } from '../../services/cartUtil.service';

@Component({
  selector: 'app-list-pizza',
  imports: [RouterLink, AddPizzaItemComponent],
  templateUrl: './list-pizza.component.html',
  styleUrl: './list-pizza.component.css',
})
export class ListPizzaComponent implements OnInit {
  cartItemStoreService = inject(CartItemStoreService);
  pizzaStoreService = inject(PizzaStoreService);
  router = inject(Router);
  cartUtilService = inject(cartUtilService);

  pizzas = signal<Pizza[]>([]);
  cartItems = this.cartItemStoreService?.cartItems;

  isAddToCart = this.cartItemStoreService?.isAddToCart;

  ngOnInit(): void {
    this.pizzas.set(this.pizzaStoreService?.pizzas());
  }

  addToCart(pizza: Pizza) {
    console.log('Add to cart');
    this.cartItemStoreService.changeIsAddToCart(true);
    this.cartUtilService.makeCartItems(pizza, this.cartItems());
  }

  backToList() {
    console.log('You must close now!!!');
    this.cartItemStoreService.changeIsAddToCart(false);
  }

  toCart(carts: CartItem[]) {
    console.log('The cart-items to cart : ', { carts });

    const newCartItems = carts?.filter((cart) => cart?.quantity !== 0);

    this.cartItemStoreService.editAllCatItems(newCartItems);
    this.cartItemStoreService.setCartItemsLocal(newCartItems);

    console.log({ carts });

    this.cartItemStoreService.changeIsAddToCart(false);

    this.router.navigateByUrl('/orders/cart');
  }
}
