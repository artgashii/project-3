import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-admin-navbar-component',
  templateUrl: './admin-navbar-component.component.html',
  styleUrl: './admin-navbar-component.component.scss'
})
export class AdminNavbarComponentComponent {
  constructor(private authService : AuthServiceService  ){}
  logout(): void {
    this.authService.logout();
  }
}
