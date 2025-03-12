import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../catalog/product.model';
import { CurrencyPipe, NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'bot-product-details',
  imports: [NgStyle, NgClass, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  @Input() product!: IProduct;
  @Output() buy = new EventEmitter();

  buyButtonClicked() {
    this.buy.emit();
  }

  getImageUrl(product: IProduct) {
    if (!product) return '';
    return '/assets/images/robot-parts/' + product.imageName;
  }

  getDiscountedClasses(product: IProduct) {
    // We can return array of classes.
    // if (product.discount > 0) return ['striketrough', 'bold'];
    if (product.discount > 0) return 'striketrough';
    else return '';
  }
}
