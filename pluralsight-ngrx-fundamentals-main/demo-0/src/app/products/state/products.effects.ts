import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsService } from "../products.service";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { catchError, concatMap, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable()

export class ProductEffects {
  // When products module is loaded all effects are registered and "ngrxOnInitEffects()"
  // will fire an action which will trigger the "loadProducts$"
  // effect, which will update the state new products.
  ngrxOnInitEffects() {
    return ProductsPageActions.loadProducts();
  }

  // We should be careful here cause Mapping Operators as its easy to cause race 
  // conditions if we don't understand how they work. Safes operator is concatMap.
  // But is less performant.
  loadProducts$ = createEffect(() => {
    console.log("Log from effects load.");
    return this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      // exhaustMap operator is better for load effects, it will ignore all subsequent 
      // subscriptions/requests until complete. Use when you don't want more requests
      // until the initial one completes.
      exhaustMap(
        () => {
          console.log("Log from effects success.");
          return this.productService.getAll().pipe(
            map((products) => ProductsAPIActions.productsLoadedSuccess({ products })),
            catchError((error) => of(ProductsAPIActions.productsLoadedFail({ message: error })))
          )
        }
      )
    )
  });

  addProduct$ = createEffect(() => {
    console.log("Log from effects add product.");
    return this.actions$.pipe(
      ofType(ProductsPageActions.addProduct),
      // Will run subscriptions/requests in parallel, and cause possible race conditions.
      // Use for get, put, post and delete methods when order is not important.
      mergeMap(({ product }) =>
        this.productService.add(product).pipe(
          map((newProduct) => ProductsAPIActions.productAddedSuccess({ product: newProduct })),
          catchError((error) => of(ProductsAPIActions.productAddedFail({ message: error })))
        ),
      )
    )
  });

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.updateProduct),
      // No race conditions with concatMap().
      concatMap(({ product }) =>
        this.productService.update(product).pipe(
          map(() => ProductsAPIActions.productUpdatedSuccess({
            update: { id: product.id, changes: product }
          })),
          catchError((error) => of(ProductsAPIActions.productUpdatedFail({ message: error })))
        ),
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productService.delete(id).pipe(
          map(() => ProductsAPIActions.productDeletedSuccess({ id })),
          catchError((error) => of(ProductsAPIActions.productDeletedFail({ message: error })))
        ),
      )
    )
  );

  redirectToProductsPage = createEffect(
    () => this.actions$.pipe(
      ofType(
        ProductsAPIActions.productAddedSuccess,
        ProductsAPIActions.productUpdatedSuccess,
        ProductsAPIActions.productDeletedSuccess,
      ),
      tap(() => this.router.navigate(['/products']))
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private productService: ProductsService,
    private router: Router
  ) { }
}

// switchMap() operator which is not presented "cancels the current subscription/request"
// Use for get requests or cancelable requests like searches.