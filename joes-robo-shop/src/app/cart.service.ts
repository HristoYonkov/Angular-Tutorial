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

// in future we may use following code
// private cart: ILineItem[] = [];

//   getTotalPrice() {
//     return (
//       Math.round(
//         this.cart.reduce<number>((prev, cur) => {
//           return (
//             prev + cur.qty * (cur.product.price * (1 - cur.product.discount))
//           );
//         }, 0) * 100
//       )
//     )
//   }

//   findLineItem() {
//     return this.cart.find((li) => li.product.id === product.id);
//   }

//   add(product: IProduct) {
//     let lineItem = this.findLineItem(product);
//     if (lineItem !== undefined) {
//       lineItem.qty ++;
//     } else {
//       lineitem = {product: product, qty: 1};
//       this.cart.push(lineItem);
//     }
//     console.log(`Product: "${product.name}" added to cart.`);
//     console.log('Total Price: + ' this.getTotalPrice());
//   }
