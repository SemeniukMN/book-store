import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: {title: 'Домашнаяя страница'},
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'card',
        loadChildren: () => import('./product/product-page/product-page.module').then(m => m.ProductPageModule),
        data: {title: 'Страница товара'},
      },
      {
        path: 'cart',
        loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule),
        data: {title: 'Корзина'},
      },
      {
        path: 'order',
        loadChildren: () => import('./pages/order/order.module').then(m => m.OrderModule),
        data: {title: 'Оформление заказа'},
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      }
    ]
  },
  {
    path: 'registration',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
