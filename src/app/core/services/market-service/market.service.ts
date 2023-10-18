import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  private apiUrl = 'http://localhost:3000/products'

  productListSubject = new BehaviorSubject<Product[]>([]);
  productList$ = this.productListSubject.asObservable();

  constructor(private http: HttpClient) { }

  getProductList(): Observable<Product[]> {
    if (this.productListSubject.value.length === 0) {
      this.productList$ = this.http.get<Product[]>(this.apiUrl);
    }

    return this.productList$;
  }

  getall(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductsByNameLike(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/?name_like=${name}`)
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
  }

  addProduct(request: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, request);
  }

  deletProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  updateProduct(request: Product, id: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, request)
  }
}
