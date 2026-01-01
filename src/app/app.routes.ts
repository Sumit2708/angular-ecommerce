import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { ProductDetailsComponent } from './features/products/product-details/product-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/products/products.component').then(
        (m) => m.ProductsComponent
      ),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import(
        './features/products/product-details/product-details.component'
      ).then((m) => m.ProductDetailsComponent),
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/cart/cart/cart.component').then(
        (m) => m.CartComponent
      ),
  },
  { path: '**', redirectTo: 'products' }
];
