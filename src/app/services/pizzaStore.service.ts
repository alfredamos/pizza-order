import { signal, computed, inject, Injectable } from '@angular/core';
import { Pizza } from '../../models/pizzas/pizza.model';
import { PizzaState } from '../../models/pizzas/pizzaState.model';
import { PizzaDbService } from './pizzaDb.service';
import { AuthStoreService } from './authStore.service';

@Injectable({
  providedIn: 'root',
})
export class PizzaStoreService {
  private pizzaState = signal<PizzaState>({ ...new PizzaState() });
  statePizza = this.pizzaState.asReadonly();
  isAdded = signal(false);

  pizzas = computed(() => this.statePizza()?.pizzas);

  pizzaDbService = inject(PizzaDbService);

  constructor() {
    console.log('In pizzaStore-constructor!!!');
    const pizzas = this.getLocalPizzas();
    console.log('At point 1, pizzas : ', pizzas);
    if (pizzas?.length > 0 && !this.isAdded()) {
      console.log('At point 2, pizzas : ', pizzas);
      this.pizzaState.update((oldPizzaState) => ({ ...oldPizzaState, pizzas }));
    } else if (this.isAdded()) {
      console.log('At point 3, pizzas');
      this.getPizzas().then((data) => console.log(data));
      this.isAdded.set(false);
    }
  }

  addPizza(pizza: Pizza) {
    const newPizzas = [...this.pizzaState()?.pizzas, pizza];
    this.pizzaState.update((pizzaState) => ({
      ...pizzaState,
      pizzas: newPizzas,
    }));
    this.pizzaDbService.createResource(pizza);

    console.log('pizza added!!!');
    this.isAdded.set(true);
  }

  deletePizza(pizzaId: string) {
    const newPizzas = this.pizzaState()?.pizzas?.filter(
      (pizza) => pizza.id !== pizzaId
    );
    this.pizzaState.update((pizzaState) => ({
      ...pizzaState,
      pizzas: newPizzas,
    }));
  }

  editPizza(pizzaPayload: Pizza) {
    const newPizzas = this.pizzaState()?.pizzas?.map((pizza) =>
      pizza.id === pizza.id ? pizzaPayload : pizza
    );
    this.pizzaState.update((pizzaState) => ({
      ...pizzaState,
      pizzas: newPizzas,
    }));
  }

  async getPizzas() {
    const pizzas = await this.pizzaDbService.getAllResources();
    this.pizzaState.update((oldPizzaState) => ({ ...oldPizzaState, pizzas }));
    this.setLocalPizzas(pizzas);
    console.log('At get-pizzas, pizzas : ', pizzas);
    return pizzas;
  }

  setLocalPizzas(pizzas: Pizza[]) {
    localStorage.setItem('pizzas', JSON.stringify(pizzas));
  }

  getLocalPizzas() {
    return JSON.parse(localStorage.getItem('pizzas')!) as Pizza[];
  }

  removeLocalPizzas() {
    localStorage.removeItem('pizzas');
  }
}
