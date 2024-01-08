// auth-service.service.ts
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';  
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private baseUrl = 'http://localhost:3000/user';
  constructor(private http: HttpClient, 
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router,) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post("http://localhost:3000/user/login", { email, password });
  }

  signup(first_name: string, last_name: string, email: string, password: string, rolecode: number): Observable<any> {
    return this.http.post("http://localhost:3000/user", { first_name, last_name, email, password, rolecode });
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = 'test';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  setToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  hasRole(role: string): boolean {
    const userRoles = this.getUserRoles();
    return userRoles.includes(role);
  }

  getUserRoles(): string[] {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.log('Token is null or undefined');
      return [];
    }
  
 
  
    try {
      const tokenPayload = this.parseJwt(token);
      const userRoles = tokenPayload.role; 
  
      return userRoles || [];
    } catch (error) {
      console.error('Error decoding token:', error);
      return [];
    }
  }
  
  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }
  
  getUserInfo(): Observable<any> {
    
    if (isPlatformBrowser(this.platformId)) {
      if (!this.isLocalStorageAvailable()) {
        console.error('localStorage is not available.');
        return throwError('localStorage is not available.');
      }
  
      const authToken = this.getToken();
  
      if (!authToken) {
        console.error('Authorization token is missing.');
        return throwError('Authorization token is missing.');
      }
  
      const headers = new HttpHeaders({ Authorization: `Bearer ${authToken}` });
  
      console.log('Headers:', headers);
  
      return this.http.get<any>(`${this.baseUrl}/userInfo`, { headers }).pipe(
        catchError((error) => {
          console.error('Error in getUserInfo:', error);
          if (error instanceof HttpErrorResponse && error.status === 401) {
            
            this.logout();
          }
          throw error; 
        })
      );
    }
    else {
      console.error('localStorage is not available in this environment.');
      return throwError('localStorage is not available.');
    }
  }
  
  updateUserDetails(updateData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/`, updateData, this.getHttpOptions());
  }
  
  deleteUser(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/`, this.getHttpOptions());
  }
  
  private getHttpOptions(): { headers: HttpHeaders } {
    const authToken = this.getToken();
  
    if (!authToken) {
      console.error('Authorization token is missing.');
      throw new Error('Authorization token is missing.');
    }
  
    const headers = new HttpHeaders({ Authorization: `Bearer ${authToken}` });
  
    return { headers };
  }

  logout(): void {
   
    localStorage.removeItem('token');
    
    
    this.router.navigate(['/login']);
  }

  
  
  updateUserDetailsByEmail(email: string, updateData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/`, { email, updateData }, this.getHttpOptions()).pipe(
      catchError((error) => {
        console.error('Error updating user by email:', error);
        throw error; 
      })
    );
  }
  adminDeleteUser(userDetails: any): Observable<any> {
    return this.http.request('delete', `${this.baseUrl}`, {
      body: userDetails,
      headers: this.getHttpOptions().headers,
    }).pipe(
      catchError((error) => {
        console.error('Error deleting user:', error);
        throw error;
      })
    );
  }
}
