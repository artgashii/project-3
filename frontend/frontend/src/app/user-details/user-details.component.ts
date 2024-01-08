import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user: any;

  updateData: any = {};
  isEditing = false;

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
    this.authService.deleteUser().subscribe(
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
}
