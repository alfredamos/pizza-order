import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pizza } from '../../../models/pizzas/pizza.model';
import { AddPizzaItemComponent } from '../add-pizza-item/add-pizza-item.component';
import { CartItem } from '../../../models/cartItems/cartItem.model';

@Component({
  selector: 'app-list-pizza',
  imports: [RouterLink, AddPizzaItemComponent],
  templateUrl: './list-pizza.component.html',
  styleUrl: './list-pizza.component.css',
})
export class ListPizzaComponent {
  pizzas = signal<Pizza[]>([]);
  carts = signal<CartItem[]>([]);

  isAddToCart = signal(false);

  addToCart(pizza: Pizza) {}

  backToList() {}

  decreaseQuantity(id: string) {}

  increaseQuantity(id: string) {}

  toCart(carts: CartItem[]) {}
}
