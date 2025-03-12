import { Component, inject } from '@angular/core';
import { IProduct } from './product.model';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { Router, ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

// We can add directly styles into the decorator but usually we want this for
// smaller components.
@Component({
  selector: 'bot-catalog',
  imports: [ProductDetailsComponent, RouterLink, RouterLinkActive],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
  // styles: ['a {font-weight: bold;}']
})
export class CatalogComponent {
  // Other way to add service.. But there is a drawback when it comes to testing..
  // you could get limited to how those tests getting written. So use constructor way. 
  // private cartServ: CartService = inject(CartService);
  products: any;
  filter: string = '';

  constructor(
    private cartServ: CartService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productSvc.getProducts().subscribe(products => {
      this.products = products;
    })
    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'] ?? '';
    });
  }

  addToCart(product: IProduct) {
    this.cartServ.add(product);
    this.router.navigate(['/cart']);
  }

  getFilteredProducts() {
    return this.filter === ''
      ? this.products
      : this.products.filter((product: any) => product.category === this.filter);
  }
}
