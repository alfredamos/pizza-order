import { Component, inject, OnInit } from '@angular/core';
import { AuthStoreService } from '../../services/authStore.service';
import { Router } from '@angular/router';
import { PizzaStoreService } from '../../services/pizzaStore.service';
import { CartItemStoreService } from '../../services/cartItemStore.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent implements OnInit {
  authStoreService = inject(AuthStoreService);
  cartItemStoreService = inject(CartItemStoreService);
  pizzaStoreService = inject(PizzaStoreService);
  router = inject(Router);
  toast = inject(HotToastService);

  ngOnInit(): void {
    this.logoutSubmit();
  }

  logoutSubmit() {
    this.cartItemStoreService.removeLocalStorageCartItems();
    this.pizzaStoreService.removeLocalStorage("pizzas");
    this.pizzaStoreService.removeLocalStorage("pizza")
    this.authStoreService.logout();

    this.toast.success('Logout is successful!');

    this.router.navigate(['/']);
  }
}
