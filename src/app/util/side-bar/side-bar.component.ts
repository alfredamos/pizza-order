import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStoreService } from '../../services/authStore.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroPencilSquare,
  heroCake,
  heroHome,
  heroArrowRightStartOnRectangle,
  /*  heroPencil,*/
} from '@ng-icons/heroicons/outline';
import { lucideUsers, lucideUserPen } from '@ng-icons/lucide';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink, NgIcon],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
  viewProviders: [
    provideIcons({
      heroPencilSquare,
      heroCake,
      heroHome,
      heroArrowRightStartOnRectangle,
      lucideUsers,
      lucideUserPen,
    }),
  ],
})
export class SideBarComponent {
  authStoreService = inject(AuthStoreService);

  isAdmin = this.authStoreService.isAdmin;
  isLoggedIn = this.authStoreService.isLoggedIn;
}
