import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PizzaStoreService } from '../../services/pizzaStore.service';
import { Pizza } from '../../../models/pizzas/pizza.model';

@Component({
  selector: 'app-detail-pizza',
  imports: [],
  templateUrl: './detail-pizza.component.html',
  styleUrl: './detail-pizza.component.css'
})
export class DetailPizzaComponent implements OnInit{
  pizza = signal<Pizza>({} as Pizza);
  pizzaStoreService = inject(PizzaStoreService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
     const pizzaId = this.route.snapshot.paramMap.get('id');
    this.pizza.set(this.pizzaStoreService.pizzas()?.find(pizza => pizza.id === pizzaId) as Pizza);
  }
}
