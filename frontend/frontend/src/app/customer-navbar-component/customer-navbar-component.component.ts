import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-customer-navbar-component',
  templateUrl: './customer-navbar-component.component.html',
  styleUrl: './customer-navbar-component.component.scss'
})
export class CustomerNavbarComponentComponent {
  dropdownVisible = false;
  constructor(private authService : AuthServiceService ){}
  logout(): void {
    this.authService.logout();
  }


  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  closeDropdown(): void {
    this.dropdownVisible = false;
  }

}
