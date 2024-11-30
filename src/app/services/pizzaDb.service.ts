import { Injectable } from '@angular/core';
import { Pizza } from '../../models/pizzas/pizza.model';
import { ApiClientService } from './apiClient.service';

@Injectable({
  providedIn: 'root',
})
export class PizzaDbService extends ApiClientService<Pizza> {
  constructor() {
    super('http://localhost:5000/api/pizzas');
  }
}
