import { Component, inject, input, signal, output } from '@angular/core';
import { Pizza } from '../../../models/pizzas/pizza.model';
import { PizzaDbService } from '../../services/pizzaDb.service';
import { Router } from '@angular/router';
import { PizzaDeleteDialogComponent } from '../pizza-delete-dialog/pizza-delete-dialog.component';
import { PizzaEditDialogComponent } from '../pizza-edit-dialog/pizza-edit-dialog.component';
import { PizzaViewDialogComponent } from '../pizza-view-dialog/pizza-view-dialog.component';
import { AuthStoreService } from '../../services/authStore.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-delete-view-edit-buttons-pizza-table',
  imports: [
    PizzaDeleteDialogComponent,
    PizzaEditDialogComponent,
    PizzaViewDialogComponent,
  ],
  templateUrl: './delete-view-edit-buttons-pizza-table.component.html',
  styleUrl: './delete-view-edit-buttons-pizza-table.component.css',
})
export class DeleteViewEditButtonsPizzaTableComponent {
  pizza = input.required<Pizza>();
  id = input.required<string>();

  onDelete = output<string>();
  onEdit = output<Pizza>();

  isDeletePizza = signal(false);
  isEditPizza = signal(false);
  isViewPizza = signal(false);
  refresh = signal(false);

  authStoreService = inject(AuthStoreService);
  pizzaDbService = inject(PizzaDbService);
  router = inject(Router);
  toast = inject(HotToastService);

  userId = this.authStoreService.currentUser()?.id;

  pizzaDeleteConfirmation() {
    this.isDeletePizza.update((oldIsDeletePizza) => !oldIsDeletePizza);
  }

  pizzaEditConfirmation() {
    this.isEditPizza.update((oldIsEditPizza) => !oldIsEditPizza);
  }

  pizzaViewConfirmation() {
    console.log('In view, isView : ', this.isViewPizza());
    this.isViewPizza.update((oldIsViewPizza) => !oldIsViewPizza);
  }

  async editPizza(pizza: Pizza) {
    console.log('Please edit me now!!!');
    pizza.userId = this.userId;
    pizza.id = this.id();
    console.log('pizza info edited : ', pizza);

    const updatedPizza = await this.pizzaDbService.editResource(
      this.id(),
      pizza
    );

    this.toast.success('Pizza edited successfully!');

    this.onEdit.emit(updatedPizza);

    this.isEditPizza.update((oldIsEditPizza) => !oldIsEditPizza);

    this.refresh.update((oldRefresh) => !oldRefresh);
  }

  backToList() {
    console.log('At point 1', this.isDeletePizza());
    if (this.isDeletePizza())
      this.isDeletePizza.update((oldIsDeletePizza) => !oldIsDeletePizza);
    if (this.isEditPizza())
      this.isEditPizza.update((oldIsEditPizza) => !oldIsEditPizza);
    if (this.isViewPizza())
      this.isViewPizza.update((oldIsViewPizza) => !oldIsViewPizza);
  }

  async deletePizza(id: string) {
    console.log('Please delete me now!!!');
    console.log('pizza info deleted : ', id);

    await this.pizzaDbService.deleteResource(id);

    this.toast.success('Pizza deleted successfully!');

    this.onDelete.emit(id);

    this.isDeletePizza.update((oldIsDeletePizza) => !oldIsDeletePizza);

    this.refresh.update((oldRefresh) => !oldRefresh);
  }
}
