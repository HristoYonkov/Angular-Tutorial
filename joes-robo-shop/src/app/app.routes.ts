import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, title: 'home - Joe\'s robot shop'},
    { path: 'catalog', component: CatalogComponent, title: 'catalog - Joe\'s robot shop' },
    { path: 'cart', component: CartComponent, title: 'cart - Joe\'s robot shop' },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home
    { path: '**', redirectTo: '' } // Wildcard route for 404
];
