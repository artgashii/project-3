import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        
        this.authService.setToken(response);
  
        if (this.authService.hasRole('admin')) {
          this.router.navigate(['/mainAdmin']);
        } else {
          this.router.navigate(['/main']);
        }
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
