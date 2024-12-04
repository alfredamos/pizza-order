import { Component, effect, inject, signal } from '@angular/core';
import { Pizza } from '../../../models/pizzas/pizza.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PizzaStoreService } from '../../services/pizzaStore.service';
import { DeleteViewEditButtonsPizzaTableComponent } from '../delete-view-edit-buttons-pizza-table/delete-view-edit-buttons-pizza-table.component';
import { DeletePizzaComponent } from '../delete-pizza/delete-pizza.component';

@Component({
  selector: 'app-table-pizza',
  imports: [RouterLink, FormsModule, DeleteViewEditButtonsPizzaTableComponent],
  templateUrl: './table-pizza.component.html',
  styleUrl: './table-pizza.component.css',
})
export class TablePizzaComponent {
  searchTerm = '';

  pizzaStoreService = inject(PizzaStoreService);

  enteredPizzas = this.pizzaStoreService?.pizzas;

  pizzaEffect = effect(() =>
    console.log('table-pizza : ', this.enteredPizzas())
  );

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
}
