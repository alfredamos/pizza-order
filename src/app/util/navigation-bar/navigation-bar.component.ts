import { Component, effect, inject, signal } from '@angular/core';
import { AuthStoreService } from '../../services/authStore.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  imports: [RouterLink],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css',
})
export class NavigationBarComponent {
  authStoreService = inject(AuthStoreService);

  currentUser = this.authStoreService?.currentUser
  isAdmin = this.authStoreService?.isAdmin;
  isLoggedIn = this.authStoreService?.isLoggedIn;

  effectLog = effect(() => {
    console.log({
      currentUser: this.currentUser(), 
      isLoggedIn: this.isLoggedIn(),
      isAdmin: this.isAdmin()
    })
  })
}
