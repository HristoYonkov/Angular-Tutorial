import { Injectable } from '@angular/core';
import { IProduct } from './catalog/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() { }

  cart: IProduct[] = [];

  add(product: IProduct) {
    this.cart.push(product);
    console.log(`Product: "${product.name}" added to cart.`);
  }
}
