import { Component, input, output } from '@angular/core';
import { Pizza } from '../../../models/pizzas/pizza.model';
import { ModalAlertComponent } from '../../util/modal-alert/modal-alert.component';
import { PizzaEditCardComponent } from '../pizza-edit-card/pizza-edit-card.component';

@Component({
  selector: 'app-pizza-edit-dialog',
  imports: [ModalAlertComponent, PizzaEditCardComponent],
  templateUrl: './pizza-edit-dialog.component.html',
  styleUrl: './pizza-edit-dialog.component.css',
})
export class PizzaEditDialogComponent {
  isEdit = input.required<boolean>();
  pizza = input.required<Pizza>();
  onBackToList = output<void>();
  onEdit = output<Pizza>();

  backToList() {
    this.onBackToList.emit();
  }

  editPizza(pizza: Pizza) {
    this.onEdit.emit(pizza);
  }
}
