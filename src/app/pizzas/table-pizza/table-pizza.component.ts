import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PizzaStoreService } from '../../services/pizzaStore.service';
import { DeleteViewEditButtonsPizzaTableComponent } from '../delete-view-edit-buttons-pizza-table/delete-view-edit-buttons-pizza-table.component';
import { PizzaDbService } from '../../services/pizzaDb.service';
import { Pizza } from '../../../models/pizzas/pizza.model';

@Component({
  selector: 'app-table-pizza',
  imports: [RouterLink, FormsModule, DeleteViewEditButtonsPizzaTableComponent],
  templateUrl: './table-pizza.component.html',
  styleUrl: './table-pizza.component.css',
})
export class TablePizzaComponent implements OnInit {
  //----> State and constants.
  searchTerm = '';
  isShowMore = signal(false);
  filteredPizzas = signal<Pizza[]>([]);

  //----> Injectors.
  pizzaDbService = inject(PizzaDbService);
  pizzaStoreService = inject(PizzaStoreService);

  //----> Computed values
  pizzas = this.pizzaStoreService.pizzas;

  //----> Life cycle.
  ngOnInit(): void {
    this.loadPizza();
  }

  //----> Actions
  async loadPizza() {
    const pizzas = await this.pizzaDbService.getAllResources();
    this.pizzaStoreService.editAllPizzas(pizzas);
    this.filteredPizzas.set(pizzas);
  }

  showMoreText(pizzaId: string){
    console.log("Pizza-id : ", pizzaId)
    this.pizzas()?.forEach(pizza =>  {
        if(pizza.id === pizzaId){
          console.log("loop-id : ", pizza.id , " , ", "given-id : ", pizzaId)
          this.isShowMore.set(!this.isShowMore())
        }
    })
  }

  submitSearch(event: Event) {
    event.preventDefault();
    const filteredPizzas = this.pizzas()?.filter(
      (pizza) =>
        pizza.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        pizza.description
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        pizza.topping.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.filteredPizzas.set(filteredPizzas);
  }

  deletePizza(pizzaId: string){
    this.filteredPizzas.set(this.pizzas()?.filter(pizza => pizza.id !== pizzaId));

    this.pizzaStoreService.deletePizza(pizzaId);
  }

  editPizza(updatedPizza: Pizza){
    this.filteredPizzas.set(this.pizzas()?.map(pizza => pizza.id === updatedPizza.id? updatedPizza: pizza ));

    this.pizzaStoreService.editPizza(updatedPizza);
  }
}
