import { createFeatureSelector, createSelector } from "@ngrx/store";
import { sumProducts } from "src/app/utils/sum-products";
import { getRouterSelectors } from "@ngrx/router-store";
import * as fromProducts from './products.reducer'


export const selectProductsState = createFeatureSelector<fromProducts.ProductsState>('products');

export const selectProducts = createSelector(
  selectProductsState,
  fromProducts.selectProducts
);

export const selectProductsEntities = createSelector(
  selectProductsState,
  fromProducts.selectProductEntities
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (productsState) => productsState.loading
);

export const selectProductsShowProductCode = createSelector(
  selectProductsState,
  (productsState) => productsState.showProductCode
);

export const selectProductsErrorMessage = createSelector(
  selectProductsState,
  (productsState) => productsState.errorMessage
);

export const selectProductsTotal = createSelector(selectProducts, sumProducts);

// Get from destructuring a 'collection of route selectors' from ngrx available
// by calling "getRouteSelectors" importing it above.
export const { selectRouteParams } = getRouterSelectors();

export const selectProductById = createSelector(
  selectProductsEntities,
  selectRouteParams,
  // Here { id } is coming from destructuring it from selectRouteParams 
  // parameter in createSelector
  (productEntities, { id }) => productEntities[id]
);
