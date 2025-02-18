import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { TemplateFormControlsComponent } from './user/template-form-controls/template-form-controls.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, title: 'home - Joe\'s robot shop'},
    { path: 'catalog', component: CatalogComponent },
    { path: 'cart', component: CartComponent, title: 'cart - Joe\'s robot shop' },
    { path: 'cart', component: CartComponent, title: 'cart - Joe\'s robot shop' },
    { path: 'sign-in', component: SignInComponent },
    { path: 'form-controls', component: TemplateFormControlsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home
    { path: '**', redirectTo: '' } // Wildcard route for 404
];
