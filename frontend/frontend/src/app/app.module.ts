import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { MainAdminComponent } from './main-admin/main-admin.component';
import { MainComponent } from './main/main.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AdminNavbarComponentComponent } from './admin-navbar-component/admin-navbar-component.component';
import { CustomerNavbarComponentComponent } from './customer-navbar-component/customer-navbar-component.component';
import { AdminUserDetailsComponent } from './admin-user-details/admin-user-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersAdminComponent } from './orders-admin/orders-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MainAdminComponent,
    MainComponent,
    UserDetailsComponent,
    AdminNavbarComponentComponent,
    CustomerNavbarComponentComponent,
    AdminUserDetailsComponent,
    ShoppingCartComponent,
    OrdersComponent,
    OrdersAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
