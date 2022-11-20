import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductPageRoutingModule } from './product-page-routing.module';
import { AuthorPipe } from '../../pipes/author.pipe';
import { ProductPageComponent } from './product-page.component';
import { TuiButtonModule, TuiFormatNumberPipeModule, TuiSvgModule } from '@taiga-ui/core';


@NgModule({
  declarations: [
    ProductPageComponent
  ],
  imports: [
    CommonModule,
    ProductPageRoutingModule,
    AuthorPipe,
    TuiButtonModule,
    TuiSvgModule,
    TuiFormatNumberPipeModule
  ]
})
export class ProductPageModule { }
