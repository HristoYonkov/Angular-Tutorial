import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'home-robot'},
    { path: 'catalog', component: CatalogComponent },
    { path: '**', redirectTo: '' } // Wildcard route for 404
];
