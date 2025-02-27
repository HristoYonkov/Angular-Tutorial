import { createReducer, on } from "@ngrx/store";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { Product } from "../product.model";

export interface ProductsState {
    showProductCode: boolean;
    loading: boolean;
    products: Product[];
    errorMessage: string;
}

const initialState: ProductsState = {
    showProductCode: true,
    loading: false,
    products: [],
    errorMessage: ''
}

export const productsReducer = createReducer(
    initialState,
    on(ProductsPageActions.toggleShowProductCode, (state) => ({
        ...state,
        showProductCode: !state.showProductCode,
    })),
    // Dispatching process, phase 3. Actual actions are happend here.
    on(ProductsPageActions.loadProducts, (state) => { 
        console.log("Log from reducers load.");
        return ({
        ...state,
        loading: true,
        products: [],
        errorMessage: '',
    })}),
    on(ProductsAPIActions.productsLoadedSuccess, (state, { products }) => {
        console.log("Log from reducers success.");
        return ({
            ...state,
            loading: false,
            products,
        })
    }),
    on(ProductsAPIActions.productsLoadedFail, (state, { message }) => ({
        ...state,
        errorMessage: message,
        loading: false,
        products: [],
    })),
    on(ProductsPageActions.addProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: '',
    })),
    on(ProductsAPIActions.productAddedSuccess, (state, { product }) => ({
        ...state,
        loading: false,
        products: [...state.products, product],
    })),
    on(ProductsAPIActions.productAddedFail, (state, { message }) => ({
        ...state,
        loading: false,
        errorMessage: message,
    })),
    on(ProductsPageActions.updateProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: '',
    })),
    on(ProductsAPIActions.productUpdatedSuccess, (state, { product }) => ({
        ...state,
        loading: false,
        products: state.products.map((existingProduct) =>
            existingProduct.id === product.id ? product : existingProduct
        ),
    })),
    on(ProductsAPIActions.productUpdatedFail, (state, { message }) => ({
        ...state,
        loading: false,
        errorMessage: message,
    }))
);