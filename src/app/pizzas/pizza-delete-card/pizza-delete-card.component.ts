import { Component, input, output, signal } from '@angular/core';
import { Pizza } from '../../../models/pizzas/pizza.model';

@Component({
  selector: 'app-pizza-delete-card',
  imports: [],
  templateUrl: './pizza-delete-card.component.html',
  styleUrl: './pizza-delete-card.component.css',
})
export class PizzaDeleteCardComponent {
  //----> State
  isShowMore = signal(false);

  //----> Props
  pizza = input.required<Pizza>();

  //----> Emits
  onBackToList = output<void>();
  onDelete = output<string>();

  //----> Handlers
  backToList() {
    console.log("Back to list!!!")
    this.onBackToList.emit();
  }

  deletePizza(pizzaId: string) {
    this.onDelete.emit(pizzaId);
  }

  showMoreText(){
    this.isShowMore.update(showMore => !showMore)
  }
}
