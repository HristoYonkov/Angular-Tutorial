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

// Dispatching process, phase 3. Actual actions are happend here.
export const productsReducer = createReducer(
    initialState,
    on(ProductsPageActions.toggleShowProductCode, (state) => ({
        ...state,
        showProductCode: !state.showProductCode,
    })),
    on(ProductsPageActions.loadProducts, (state) => ({
        ...state,
        loading: true,
        products: [],
        errorMessage: '',
    })),
    on(ProductsAPIActions.productsLoadedSuccess, (state, { products }) => ({
        ...state,
        loading: false,
        products,
    })),
    on(ProductsAPIActions.productsLoadedFail, (state, { message }) => ({
        ...state,
        products: [],
        errorMessage: message,
        loading: false,
    }))
);