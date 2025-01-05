import { Component, computed, inject, OnInit } from '@angular/core';
import { CartItemStoreService } from '../../services/cartItemStore.service';
import { CartUtilService } from '../../services/cartUtil.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-payment-success',
  imports: [],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css',
})
export class PaymentSuccessComponent implements OnInit {
  cartItemStoreService = inject(CartItemStoreService);
  cartUtilService = inject(CartUtilService);
  router = inject(Router);
  toast = inject(HotToastService);

  carts = this.cartItemStoreService.cartItems;

  totalPrice = computed(() => this.cartUtilService.totalPrice(this.carts()));
  totalQuantity = computed(() =>
    this.cartUtilService.totalQuantity(this.carts())
  );

  ngOnInit(): void {
    this.toast.success('Order has been paid successfully!');
  }

  backToPizzas() {
    this.cartItemStoreService.removeLocalStorageCartItems();
    this.cartItemStoreService.editAllCatItems([]);
    this.router.navigateByUrl('/');
  }
}
