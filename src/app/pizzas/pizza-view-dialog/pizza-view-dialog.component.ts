import { Component, input, output } from '@angular/core';
import { Pizza } from '../../../models/pizzas/pizza.model';
import { ModalAlertComponent } from '../../util/modal-alert/modal-alert.component';
import { PizzaViewCardComponent } from '../pizza-view-card/pizza-view-card.component';

@Component({
  selector: 'app-pizza-view-dialog',
  imports: [ModalAlertComponent, PizzaViewCardComponent],
  templateUrl: './pizza-view-dialog.component.html',
  styleUrl: './pizza-view-dialog.component.css',
})
export class PizzaViewDialogComponent {
  isView = input.required<boolean>();
  pizza = input.required<Pizza>();
  onBackToList = output<void>();

  backToList() {
    this.onBackToList.emit();
  }
}
