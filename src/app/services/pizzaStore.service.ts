import { signal, computed, inject, Injectable } from '@angular/core';
import { Pizza } from '../../models/pizzas/pizza.model';
import { PizzaState } from '../../models/pizzas/pizzaState.model';

@Injectable({
  providedIn: 'root',
})
export class PizzaStoreService {
  private pizzaState = signal<PizzaState>({ ...new PizzaState() });
  statePizza = this.pizzaState.asReadonly();

  localStoragePizza = computed(() => this.getLocalStoragePizzas());

  pizzas = computed(() => {
    return this.statePizza()?.pizzas ?? this.localStoragePizza;
  });

  addPizza(pizza: Pizza) {
    const newPizzas = [...this.pizzaState()?.pizzas, pizza];
    this.pizzaState.update((pizzaState) => ({
      ...pizzaState,
      pizzas: newPizzas,
    }));
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

  updatePizzaState(pizzas: Pizza[]) {
    this.pizzaState.update((oldPizzaState) => ({ ...oldPizzaState, pizzas }));
    this.removeLocalStoragePizzas();
    this.setLocalStoragePizzas(pizzas);
  }

  setLocalStoragePizzas(pizzas: Pizza[]) {
    localStorage.setItem('pizzas', JSON.stringify(pizzas));
  }

  private getLocalStoragePizzas() {
    return JSON.parse(localStorage.getItem('pizzas')!) as Pizza[];
  }

  removeLocalStoragePizzas() {
    localStorage.removeItem('pizzas');
  }
}
