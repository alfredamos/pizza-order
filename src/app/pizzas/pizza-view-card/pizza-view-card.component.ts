import { Component, input, output, signal } from '@angular/core';
import { Pizza } from '../../../models/pizzas/pizza.model';

@Component({
  selector: 'app-pizza-view-card',
  imports: [],
  templateUrl: './pizza-view-card.component.html',
  styleUrl: './pizza-view-card.component.css',
})
export class PizzaViewCardComponent {
  //----> State
  isShowMore = signal(false);

  //----> Props
  pizza = input.required<Pizza>();

  //----> Emits
  onCancel = output<void>();

  //----> handlers
  backToList() {
    this.onCancel.emit();
  }

  showMoreText(){
    this.isShowMore.update(showMore => !showMore)
  }
}
