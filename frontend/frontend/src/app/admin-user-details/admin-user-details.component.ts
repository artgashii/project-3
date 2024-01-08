

import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-admin-user-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.scss']
})
export class AdminUserDetailsComponent implements OnInit {
  user: any;
  updateData: any = {
    first_name1: '',
    last_name1: '',
    email1: '',
    password1: '',
    new_first_name1: '',
    new_last_name1: '',
    new_email1: '',
    role: '',
  };
  deleteData:any={
    first_name: '',
    last_name: '',
    email: '',
  }
  isEditing = false;
  isDeleting = false;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.authService.getUserInfo().subscribe(
      (data) => {
        this.user = data;
        console.log('User details:', this.user);
      },
      (error) => {
        console.error('Error getting user details:', error);
      }
    );
  }

  updateUser(): void {
    this.authService.updateUserDetails(this.updateData).subscribe(
      (data) => {
        console.log('User updated:', data);
        this.isEditing = false;
        this.getUserDetails();
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

  deleteUser(): void {
    const userDetails = {
      first_name: this.updateData.first_name1,
      last_name: this.updateData.last_name1,
      email: this.updateData.email1,
    };
  
    this.authService.adminDeleteUser(this.deleteData).subscribe(
      (data) => {
        console.log('User deleted:', data);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }
  toggleDelete(): void {
    this.isDeleting = !this.isDeleting;
  }
}
