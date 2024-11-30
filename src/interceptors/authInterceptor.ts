import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { tap } from 'rxjs';
import { AuthDbService } from '../app/services/authDb.service';
import { AuthStoreService } from '../app/services/authStore.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authDbService = inject(AuthDbService);
  const authStoreService = inject(AuthStoreService);
  const token = computed(() => authStoreService.stateAuth()?.token);

  const request = req.clone({
    setHeaders: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json',
      Authorization: `Bearer ${token()}`,
    },
  });

  return next(request).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse && event.status === 401) {
        console.log('Invalid credentials or expired token, please login!');
        authStoreService.logout();
        window.location.href = '/must-login';
      }
      if (event instanceof HttpResponse && event.status === 403) {
        console.log('You are not authorized to view this page, please login!');
        authStoreService.logout();
        window.location.href = '/not-allowed';
      }
    })
  );
};
