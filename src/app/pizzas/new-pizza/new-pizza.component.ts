import { Component, inject, signal } from '@angular/core';
import { Pizza } from '../../../models/pizzas/pizza.model';
import { PizzaFormComponent } from '../../forms/pizza-form/pizza-form.component';
import { AuthStoreService } from '../../services/authStore.service';

@Component({
  selector: 'app-new-pizza',
  imports: [PizzaFormComponent],
  templateUrl: './new-pizza.component.html',
  styleUrl: './new-pizza.component.css',
})
export class NewPizzaComponent {
  authStoreService = inject(AuthStoreService);

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
}
