import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'http://localhost:3000/user'; 

  constructor(private http: HttpClient,
    private authService : AuthServiceService) { }

  createOrder(orderData: any): Observable<any> {
    const authToken = this.authService.getToken();
    if (!authToken) {
      console.error('Authorization token is missing.');
      return throwError('Authorization token is missing.');
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    });
  
    return this.http.post(`${this.apiUrl}/order`, orderData, { headers }).pipe(
      catchError((error) => {
        console.error('Error creating order:', error);
        throw error;
      })
    );
  }

  updateOrder(orderId: number, orderData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/order/${orderId}`, orderData, { headers });
  }

 

  getUserOrders(): Observable<any> {
    const authToken = this.authService.getToken();
  
    if (!authToken) {
      console.error('Authorization token is missing.');
      return throwError('Authorization token is missing.');
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    });
  
    return this.http.get(`${this.apiUrl}/order`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching user orders:', error);
        throw error;
      })
    );
  }

  getAllOrders(): Observable<any> {
    const authToken = this.authService.getToken();

    if (!authToken) {
      console.error('Authorization token is missing.');
      return new Observable(); 
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.get(`${this.apiUrl}/allorders`, { headers });
  }
}
