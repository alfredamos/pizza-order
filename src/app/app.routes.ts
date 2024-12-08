import { Routes } from '@angular/router';
import { protectedGuard } from '../guard/protected.guard';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { EditProfileComponent } from './auth/edit-profile/edit-profile.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { MustLoginComponent } from './auth/must-login/must-login.component';
import { NotAllowedComponent } from './auth/not-allowed/not-allowed.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SomethingWrongComponent } from './auth/something-wrong/something-wrong.component';
import { ListPizzaComponent } from './pizzas/list-pizza/list-pizza.component';
import { CartComponent } from './orders/cart/cart.component';
import { CheckoutComponent } from './orders/checkout/checkout.component';
import { TablePizzaComponent } from './pizzas/table-pizza/table-pizza.component';
import { adminGuard } from '../guard/admin.guard';
import { EditPizzaComponent } from './pizzas/edit-pizza/edit-pizza.component';
import { DeletePizzaComponent } from './pizzas/delete-pizza/delete-pizza.component';
import { NewPizzaComponent } from './pizzas/new-pizza/new-pizza.component';
import { DetailPizzaComponent } from './pizzas/detail-pizza/detail-pizza.component';
import { TableUserComponent } from './users/table-user/table-user.component';
import { PaymentComponent } from './orders/payment/payment.component';

export const routes: Routes = [
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [protectedGuard],
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [protectedGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'must-login', component: MustLoginComponent },
  { path: 'not-allowed', component: NotAllowedComponent },
  { path: 'something-wrong', component: SomethingWrongComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'orders/cart',
    component: CartComponent,
    canActivate: [protectedGuard],
  },
  {
    path: 'orders/checkout',
    component: CheckoutComponent,
    canActivate: [protectedGuard],
  },
  {
    path: 'orders/payment',
    component: PaymentComponent,
    canActivate: [protectedGuard],
  },
  { path: '', component: ListPizzaComponent },
  {
    path: 'pizzas',
    component: TablePizzaComponent,
    canActivate: [protectedGuard, adminGuard],
  },
  {
    path: 'pizzas/new',
    component: NewPizzaComponent,
    canActivate: [protectedGuard, adminGuard],
  },
  {
    path: 'pizzas/:id/edit',
    component: EditPizzaComponent,
    canActivate: [protectedGuard, adminGuard],
  },
  {
    path: 'pizzas/:id/delete',
    component: DeletePizzaComponent,
    canActivate: [protectedGuard, adminGuard],
  },
  {
    path: 'pizzas/:id/detail',
    component: DetailPizzaComponent,
    canActivate: [protectedGuard, adminGuard],
  },
  {
    path: 'users',
    component: TableUserComponent,
    canActivate: [protectedGuard, adminGuard],
  },
];
