import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ProductCardComponent } from '../product/product-card/product-card.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ProductCardComponent
  ]
})
export class MainModule { }
