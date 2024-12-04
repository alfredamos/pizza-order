import { Component, inject, input, signal } from '@angular/core';
import { Pizza } from '../../../models/pizzas/pizza.model';
import { PizzaDbService } from '../../services/pizzaDb.service';
import { Router } from '@angular/router';
import { PizzaDeleteDialogComponent } from '../pizza-delete-dialog/pizza-delete-dialog.component';
import { PizzaEditDialogComponent } from '../pizza-edit-dialog/pizza-edit-dialog.component';
import { PizzaViewDialogComponent } from '../pizza-view-dialog/pizza-view-dialog.component';

@Component({
  selector: 'app-delete-view-edit-buttons-pizza-table',
  imports: [PizzaDeleteDialogComponent, PizzaEditDialogComponent, PizzaViewDialogComponent],
  templateUrl: './delete-view-edit-buttons-pizza-table.component.html',
  styleUrl: './delete-view-edit-buttons-pizza-table.component.css',
})
export class DeleteViewEditButtonsPizzaTableComponent {
  pizza = input.required<Pizza>();
  id = input.required<string>();

  isDeletePizza = signal(false);
  isEditPizza = signal(false);
  isViewPizza = signal(false);
  refresh = signal(false)

  pizzaDbService = inject(PizzaDbService);
  router = inject(Router);

  pizzaDeleteConfirmation(){
    this.isDeletePizza.set(!this.isDeletePizza())
  };

  pizzaEditConfirmation(){
    this.isEditPizza.set(!this.isEditPizza())
  };

  async editPizza(pizza: Pizza){
    console.log('pizza info edited : ', pizza);

    await this.pizzaDbService.editResource(this.id(), pizza)

    this.isEditPizza.set(!this.isEditPizza());

    this.refresh.set(!this.refresh);
  };

  backToList(){
    console.log('At point 1', this.isDeletePizza());
    if(this.isDeletePizza()) this.isDeletePizza.set(!this.isDeletePizza());
    if(this.isEditPizza()) this.isEditPizza.set(!this.isEditPizza());
    if (this.isViewPizza()) this.isViewPizza.set(!this.isViewPizza);
  };

  pizzaViewConfirmation(){
    this.isViewPizza.set(!this.isViewPizza);
  };

  async deletePizza(id: string){
    console.log('pizza info deleted : ', id);

    await this.pizzaDbService.deleteResource(id);

    this.isDeletePizza.set(!this.isDeletePizza());

     this.refresh.set(!this.refresh);
  };
}
