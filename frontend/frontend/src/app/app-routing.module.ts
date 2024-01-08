// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainAdminComponent } from './main-admin/main-admin.component';
import { MainComponent } from './main/main.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AdminUserDetailsComponent } from './admin-user-details/admin-user-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrdersAdminComponent } from './orders-admin/orders-admin.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'mainAdmin',
    component: MainAdminComponent,
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
     path: 'user-details',
      component: UserDetailsComponent
     },
  {path:"adminUserDetails",
  component: AdminUserDetailsComponent
  },
  {
    path:"shoppingCart",
    component: ShoppingCartComponent
  },
  {
    path:"orderAdmin",
    component:OrdersAdminComponent
  },{
    path:"orders",
    component:OrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
