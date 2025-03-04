import { signal, computed, inject, Injectable, Signal } from '@angular/core';
import { Pizza } from '../../models/pizzas/pizza.model';
import { PizzaState } from '../../models/pizzas/pizzaState.model';

@Injectable({
  providedIn: 'root',
})
export class PizzaStoreService {
  private pizzaState = signal<PizzaState>({ ...new PizzaState() });
  private pizzaDetail = signal<Pizza>(new Pizza());

  pizzas = computed(() => {
    return this.pizzaState()?.pizzas ?? this.getLocalStorage<Pizza[]>("pizzas");
  });

  pizza = computed(() => {
    return this.pizzaDetail() ?? this.getLocalStorage<Pizza>("pizza");
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
      pizza.id === pizzaPayload.id ? pizzaPayload : pizza
    );
    this.pizzaState.update((pizzaState) => ({
      ...pizzaState,
      pizzas: newPizzas,
    }));
  }

  editAllPizzas(pizzas: Pizza[]) {
    this.pizzaState.update((oldPizzaState) => ({ ...oldPizzaState, pizzas }));
    this.removeLocalStorage("pizzas");
    this.setLocalStorage("pizzas", pizzas);
  }

  updatePizza(pizza: Pizza){
    this.pizzaDetail.set(pizza);
    this.setLocalStorage("pizza", pizza)
  }


  setLocalStorage<T>(key: string, resource: T) {
    localStorage.setItem(key, JSON.stringify(resource));
  }

  private getLocalStorage<T>(key: string) {
    return JSON.parse(localStorage.getItem(key)!) as T;
  }

  removeLocalStorage(key: string) {
    localStorage.removeItem(key);
  }
}
