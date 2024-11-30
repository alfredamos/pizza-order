import { Component, signal } from '@angular/core';
import { Pizza } from '../../../models/pizzas/pizza.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-pizza',
  imports: [RouterLink, FormsModule],
  templateUrl: './table-pizza.component.html',
  styleUrl: './table-pizza.component.css'
})
export class TablePizzaComponent {
  enteredPizzas = signal<Pizza[]>([]);
  searchTerm = signal("")

  searchHandler(){

  }
}
