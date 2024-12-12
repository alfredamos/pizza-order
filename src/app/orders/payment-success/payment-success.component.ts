import { Component, computed, inject } from '@angular/core';
import { CartItemStoreService } from '../../services/cartItemStore.service';
import { CartUtilService } from '../../services/cartUtil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  imports: [],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css',
})
export class PaymentSuccessComponent {
  cartItemStoreService = inject(CartItemStoreService);
  cartUtilService = inject(CartUtilService);
  router = inject(Router);

  carts = this.cartItemStoreService.cartItems;

  totalPrice = computed(() => this.cartUtilService.totalPrice(this.carts()));
  totalQuantity = computed(() =>
    this.cartUtilService.totalQuantity(this.carts())
  );

  backToPizzas() {
    this.cartItemStoreService.removeLocalStorageCartItems();
    this.cartItemStoreService.editAllCatItems([]);
    this.router.navigateByUrl('/');
  }
}
