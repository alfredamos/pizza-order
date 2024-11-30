import { Component, inject, OnInit } from '@angular/core';
import { AuthStoreService } from '../../services/authStore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent implements OnInit {
  authStoreService = inject(AuthStoreService);
  router = inject(Router);

 ngOnInit(): void {
   this.logoutSubmit()
 }

  logoutSubmit() {
    this.authStoreService.logout();

    this.router.navigate(['/']);
  }
}
