import { Component, inject, OnInit } from '@angular/core';
import { AuthStoreService } from '../../services/authStore.service';
import { Router } from '@angular/router';
import { PizzaStoreService } from '../../services/pizzaStore.service';
import { CartItemStoreService } from '../../services/cartItemStore.service';

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

  ngOnInit(): void {
    this.logoutSubmit();
  }

  logoutSubmit() {
    this.cartItemStoreService.removeCartItemsLocal();
    this.pizzaStoreService.removeLocalPizzas();
    this.authStoreService.logout();

    this.router.navigate(['/']);
  }
}
