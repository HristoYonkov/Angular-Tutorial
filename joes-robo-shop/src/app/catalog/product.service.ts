import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from './product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts (): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('/api/products');
    // Note that we can put querry params if we need 
    // return this.http.get<IProduct[]>('/api/products?sort=);
  }
}
