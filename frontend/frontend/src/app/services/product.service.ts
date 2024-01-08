

import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`);
  }

  createProduct(productData: FormData, authToken: string | null): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
    });
  
    return this.http.post<any>(`${this.baseUrl}/create`, productData, { headers });
  }

  updateProduct(productId: number, productData: FormData, authToken: string | null): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
    });
  
    return this.http.put<any>(`${this.baseUrl}/update/${productId}`, productData, { headers });
  } 

deleteProduct(productId: number, authToken: string | null): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
    });
  
    return this.http.delete<any>(`${this.baseUrl}/delete/${productId}`, { headers });
}
}
