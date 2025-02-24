import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "../product.model";

// Following code is for strongly typed actions.

export const ProductsPageActions = createActionGroup({
    source: 'Products Page',
    events: {
        'Toggle Show Product Code': emptyProps(),
        'Load producrs': emptyProps(),
        'Add Product': props<{product: Product}>(),
        'Update Product': props<{product: Product}>(),
        'Delete Product': props<{id: number}>(),
    }
});

export const ProductsAPIActions = createActionGroup({
    source: 'Products API',
    events: {
        'Products Loaded Success': props<{products: Product[]}>(),
        'Products Loaded Fail': props<{products: string}>(),
        'Product Added Success': props<{products: Product}>(),
        'Product Added Fail': props<{products: string}>(),
        'Product Updated Success': props<{products: Product}>(),
        'Product Updated Fail': props<{products: string}>(),
        'Product Deleted Success': props<{products: number}>(),
        'Product Deleted Fail': props<{products: string}>(),
    }
});