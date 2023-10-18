import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000/cart'

  constructor(private http: HttpClient) { }

  getallCart(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.apiUrl);
  }

  del(): Observable<Cart[]> {
    return this.http.delete<Cart[]>(this.apiUrl);
  }

  addProduct(request: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, request);
  }

  deletProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  updateProduct(request: Cart, id: number): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/${id}`, request)
  }

}
