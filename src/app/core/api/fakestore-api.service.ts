import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class FakestoreApiService {
  public baseUrl = 'https://fakestoreapi.com';
  constructor(public http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getProduct(id: number) {
    return this.http.get<Product[]>(`${this.baseUrl}/products/${id}`);
  }

  getCategories() {
  return this.http.get<string[]>(
    `${this.baseUrl}/products/categories`
  );
}

getProductsByCategory(category: string) {
  return this.http.get<Product[]>(
    `${this.baseUrl}/products/category/${category}`
  );
}

}
