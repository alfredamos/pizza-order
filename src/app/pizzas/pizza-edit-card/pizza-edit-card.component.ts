import { Component, input, output } from '@angular/core';
import { Pizza } from '../../../models/pizzas/pizza.model';
import { PizzaFormComponent } from '../../forms/pizza-form/pizza-form.component';

@Component({
  selector: 'app-pizza-edit-card',
  imports: [PizzaFormComponent],
  templateUrl: './pizza-edit-card.component.html',
  styleUrl: './pizza-edit-card.component.css',
})
export class PizzaEditCardComponent {
  formName = input.required<string>();
  pizza = input.required<Pizza>();
  onCancel = output<void>();
  onEdit = output<Pizza>();

  backToList() {
    this.onCancel.emit();
  }

  editPizza(pizza: Pizza) {
    this.onEdit.emit(pizza);
  }
}
