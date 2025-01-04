import { Component, computed, effect, inject, signal } from '@angular/core';
import { AuthStoreService } from '../../services/authStore.service';
import { RouterLink } from '@angular/router';
import { CartUtilService } from '../../services/cartUtil.service';
import { CartItemStoreService } from '../../services/cartItemStore.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navigation-bar',
  imports: [RouterLink, NgClass],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css',
})
export class NavigationBarComponent {
  authStoreService = inject(AuthStoreService);
  cartItemStoreService = inject(CartItemStoreService);
  cartUtilService = inject(CartUtilService);

  currentUser = this.authStoreService?.currentUser;
  isAdmin = this.authStoreService?.isAdmin;
  isLoggedIn = this.authStoreService?.isLoggedIn;
  carts = this.cartItemStoreService.cartItems;
  open = signal(true);
  close = signal(false);

  firstName = computed(() => this.currentUser()?.name?.split(' ')[0]);

  totalQuantity = computed(() =>
    this.cartUtilService.totalQuantity(this.carts())
  );

  onOpenDropdown() {
    console.log('In-navbar!!!');
    this.open.update((oldValue) => !oldValue);
    //this.close.update((oldValue) => !oldValue);
    console.log('open : ', this.open());
  }

  onCloseDropdown() {
    console.log('out-navbar!!!');
    this.close.update((oldValue) => !oldValue);
    //this.open.update((oldValue) => !oldValue);
    console.log('close : ', this.open());
  }
}
