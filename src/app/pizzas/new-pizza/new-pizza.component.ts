import { Component, inject, signal } from '@angular/core';
import { Pizza } from '../../../models/pizzas/pizza.model';
import { PizzaFormComponent } from '../../forms/pizza-form/pizza-form.component';
import { AuthStoreService } from '../../services/authStore.service';
import { Router } from '@angular/router';
import { PizzaDbService } from '../../services/pizzaDb.service';
import { PizzaStoreService } from '../../services/pizzaStore.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-new-pizza',
  imports: [PizzaFormComponent],
  templateUrl: './new-pizza.component.html',
  styleUrl: './new-pizza.component.css',
})
export class NewPizzaComponent {
  pizzaDbService = inject(PizzaDbService);
  pizzaStoreService = inject(PizzaStoreService);
  authStoreService = inject(AuthStoreService);
  router = inject(Router);
  toast = inject(HotToastService);

  userId = this.authStoreService.currentUser()?.id;

  pizza = signal<Pizza>({
    id: '',
    name: '',
    price: 0,
    quantity: 0,
    topping: '',
    description: '',
    image: '',
    userId: this.userId,
    cartItems: [],
  });

  backToList() {
    this.router.navigateByUrl('/');
  }

  async submitPizza(pizza: Pizza) {
    pizza.userId = this.userId;
    console.log({ inputPizza: pizza });
    //----> Store the new pizza in the database.
    const newPizza = await this.pizzaDbService.createResource(pizza);

    //----> Store the new pizza in the client pizza-store.
    this.pizzaStoreService.addPizza(newPizza);
    console.log({ newPizza });

    this.toast.success("New pizza added successfully!")

    this.router.navigateByUrl('/pizzas');
  }
}
