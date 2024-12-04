import { Component, input, output } from '@angular/core';
import { Pizza } from '../../../models/pizzas/pizza.model';

@Component({
  selector: 'app-pizza-view-card',
  imports: [],
  templateUrl: './pizza-view-card.component.html',
  styleUrl: './pizza-view-card.component.css',
})
export class PizzaViewCardComponent {
  pizza = input.required<Pizza>();
  onCancel = output<void>();

  backToList() {
    this.onCancel.emit();
  }
}
