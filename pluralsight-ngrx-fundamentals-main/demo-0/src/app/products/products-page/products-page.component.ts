import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsPageActions } from '../state/products.actions';
import { selectProducts, selectProductsErrorMessage, selectProductsLoading, selectProductsShowProductCode, selectProductsTotal } from '../state/products.selectors';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  products$ = this.store.select(selectProducts);
  total$ = this.store.select(selectProductsTotal);
  loading$ = this.store.select(selectProductsLoading);
  showProductCode$ = this.store.select(selectProductsShowProductCode);
  errorMessage$ = this.store.select(selectProductsErrorMessage);

  constructor(private store: Store) {
    this.store.subscribe((store) => console.log(store)
    )
  }

  ngOnInit() {
    // Dispatching process, phase 1.
    this.store.dispatch(ProductsPageActions.loadProducts());
  }
  
  toggleShowProductCode() {
    /* When user clicks on the checkbox, then component creates an action
     and dispatches it to the reducer telling him to toggle, "Toggle Show Product Code" property.
     The reducer uses the action and the existing store state to create new state with
     the "showProductCode" property settin it to the true, then returns that new state
     to the store. The store broadcasts state changes to all subscribers.
     Which in this case is the only products component. */
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
