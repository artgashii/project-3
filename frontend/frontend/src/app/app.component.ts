import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isAdmin: boolean = false;

  constructor(private authService: AuthServiceService, private router: Router) {}

  ngOnInit() {
   
    this.isAdmin = this.authService.hasRole('admin');


    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAdmin = this.authService.hasRole('admin');
      }
    });
  }

  isLoginOrSignupRoute(): boolean {
    return this.router.url.includes('/login') || this.router.url.includes('/signup');
  }}
