import { computed, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStoreService } from '../app/services/authStore.service';

export const protectedGuard: CanActivateFn = (_, state) => {
  const authStoreService = inject(AuthStoreService);
  const router = inject(Router);

  const isLoggedIn = authStoreService?.isLoggedIn

  if (!isLoggedIn()) return router.navigate(["/must-login"]);
  
  return isLoggedIn();
};
