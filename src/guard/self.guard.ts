import { CanActivateFn, Route } from '@angular/router';
import { Router } from '@angular/router';
import { computed, inject, signal } from '@angular/core';
import { AuthStoreService } from '../app/services/auth-store.service';
import { CustomerDbService } from '../app/services/customer-db.service';

export const selfGuard: CanActivateFn = (route, state) => {
  const authStoreService = inject(AuthStoreService);
  const customerDbService = inject(CustomerDbService);
  const router = inject(Router);

  const id = route.params['id'];
  console.log('Id from params, id : ', id);

  const userId = computed(
    () => authStoreService.stateAuth()?.currentUser?.id as string
  );

  const customerId = signal('');

  customerDbService.getCustomerByUserId(userId()).then((result) => {
    customerId.set(result?.id);
  });

  //const isSame = id === customerId();
  const isSame = computed(() => id === customerId());

  console.log('isSame : ', isSame());

  if (!isSame()) return router.navigate(['/not-allowed']);

  return isSame();
};
