import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Store } from '@ngrx/store';
import { ProductsAPIActions, ProductsPageActions } from '../state/products.actions';
import { selectProducts, selectProductsLoading, selectProductsTotal } from '../state/products.selectors';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  products$ = this.store.select(selectProducts);
  total$ = this.store.select(selectProductsTotal);
  loading$ = this.store.select(selectProductsLoading);
  showProductCode$ = this.store.select(
    (state: any) => state.products.showProductCode
  );
  errorMessage = '';

  constructor(
    private productsService: ProductsService,
    private store: Store
  ) {
    this.store.subscribe((store) => console.log(store)
    )
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.store.dispatch(ProductsPageActions.loadProducts())
    this.productsService.getAll().subscribe({
      next: (products) => {
        this.store.dispatch(ProductsAPIActions.productsLoadedSuccess({ products }))
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  toggleShowProductCode() {
    // Dispatching process, phase 1
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
