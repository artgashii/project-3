// signup.component.ts
import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private authService: AuthServiceService) {}
  formData: any = { first_name: '', last_name: '', email: '', password: '', rolecode: null };

  signup(formData: NgForm) {
    const { first_name, last_name, email, password, rolecode } = this.formData;
    this.authService.signup(first_name, last_name, email, password, rolecode)
      .subscribe(
        (response) => {
          console.log('Signup successful', response);
        },
        (error) => {
          console.error('Signup failed', error);
        }
      );
  }
}
