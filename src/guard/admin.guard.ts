import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { computed, inject } from '@angular/core';
import { AuthStoreService } from '../app/services/authStore.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authStoreService = inject(AuthStoreService);
  const router = inject(Router);

  const isAdmin = authStoreService?.isAdmin

  if (!isAdmin()) return router.navigate(['/not-allowed']);

  return isAdmin()
};
