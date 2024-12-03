import { Component, inject, signal } from '@angular/core';
import { Pizza } from '../../../models/pizzas/pizza.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PizzaStoreService } from '../../services/pizzaStore.service';

@Component({
  selector: 'app-table-pizza',
  imports: [RouterLink, FormsModule],
  templateUrl: './table-pizza.component.html',
  styleUrl: './table-pizza.component.css',
})
export class TablePizzaComponent {
  pizzaStoreService = inject(PizzaStoreService);
  enteredPizzas = this.pizzaStoreService?.pizzas;
  searchTerm = '';

  submitSearch(event: Event) {
    event.preventDefault();
    this.enteredPizzas()?.filter(
      (pizza) =>
        pizza.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        pizza.description
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        pizza.topping.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  viewPizzaConfirmation() {}

  pizzaEditConfirmation() {}

  pizzaDeleteConfirmation() {}
}
