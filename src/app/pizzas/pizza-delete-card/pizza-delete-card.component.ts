import { Component, input, output } from '@angular/core';
import { Pizza } from '../../../models/pizzas/pizza.model';

@Component({
  selector: 'app-pizza-delete-card',
  imports: [],
  templateUrl: './pizza-delete-card.component.html',
  styleUrl: './pizza-delete-card.component.css',
})
export class PizzaDeleteCardComponent {
  pizza = input.required<Pizza>();
  onBackToList = output<void>();
  onDelete = output<string>();

  backToList() {
    console.log("Back to list!!!")
    this.onBackToList.emit();
  }

  deletePizza(pizzaId: string) {
    this.onDelete.emit(pizzaId);
  }
}
