import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: object) {}

  shopingCart(product_id: number, quantity: number): Observable<any> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return throwError('Token is missing');
    }

    const headers = new HttpHeaders({ 
      Authorization: `Bearer ${token}`
    });

    return this.http.post("http://localhost:3000/user/cart", { product_id, quantity }, { headers });
  }

  getShoppingCart(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
  
      if (!token) {
        return throwError('Token is missing');
      }
  
      const headers = new HttpHeaders({ 
        Authorization: `Bearer ${token}`
      });
  
      return this.http.get("http://localhost:3000/user/cart", { headers });
    } else {
      console.error('localStorage is not available in this environment.');
      return throwError('localStorage is not available.');
    }
  }
  clearShoppingCart(): Observable<any> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return throwError('Token is missing');
    }
  
    const headers = new HttpHeaders({ 
      Authorization: `Bearer ${token}`
    });
  
    return this.http.delete("http://localhost:3000/user/cart", { headers });
  }
  deleteShoppingCartItem(cart_item_id: number): Observable<any> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return throwError('Token is missing');
    }

    const headers = new HttpHeaders({ 
      Authorization: `Bearer ${token}`
    });

    return this.http.delete(`http://localhost:3000/user/cart/item/${cart_item_id}`, { headers });
  }
}
