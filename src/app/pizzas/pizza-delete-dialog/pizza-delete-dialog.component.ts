import { Component, input, output } from '@angular/core';
import { Pizza } from '../../../models/pizzas/pizza.model';
import { ModalAlertComponent } from '../../util/modal-alert/modal-alert.component';
import { PizzaDeleteCardComponent } from '../pizza-delete-card/pizza-delete-card.component';

@Component({
  selector: 'app-pizza-delete-dialog',
  imports: [ModalAlertComponent, PizzaDeleteCardComponent],
  templateUrl: './pizza-delete-dialog.component.html',
  styleUrl: './pizza-delete-dialog.component.css'
})
export class PizzaDeleteDialogComponent {
  isDelete = input.required<boolean>();
  pizza = input.required<Pizza>();
  onBackToList = output<void>();
  onDelete = output<string>();

  backToList(){
    this.onBackToList.emit();

  }

  deletePizza(pizzaId: string){
    this.onDelete.emit(pizzaId)
  }
}
