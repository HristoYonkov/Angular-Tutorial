import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsService } from "../products.service";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { catchError, concatMap, exhaustMap, map, mergeMap, of } from "rxjs";

@Injectable()

export class ProductEffects {

    constructor(
        private actions$: Actions,
        private productService: ProductsService
    ) { }

    // We should be careful here cause Mapping Operators as its easy to cause race conditions if we don't understand how they work. Safes operator is concatMap. But is less performant.
    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsPageActions.loadProducts),
            // exhaustMap operator is better for load effects.
            exhaustMap(
                () => {
                    console.log("Log from effects.");
                    return this.productService.getAll().pipe(
                        map((products) => ProductsAPIActions.productsLoadedSuccess({ products })),
                        catchError((error) => of(ProductsAPIActions.productsLoadedFail({ message: error })))
                    )
                }
            )
        )
    );

    addProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsPageActions.addProduct),
            // Will run subequent adds in parallel.
            mergeMap(({ product }) =>
                this.productService.add(product).pipe(
                    map((newProduct) => ProductsAPIActions.productAddedSuccess({ product: newProduct })),
                    catchError((error) => of(ProductsAPIActions.productAddedFail({ message: error })))
                ),
            )
        )
    );

    updateProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsPageActions.updateProduct),
            concatMap(({ product }) =>
                this.productService.update(product).pipe(
                    map(() => ProductsAPIActions.productUpdatedSuccess({ product })),
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
}