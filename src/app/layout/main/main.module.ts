import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main.component';
import { ProductCardComponent } from '../../product/product-card/product-card.component';
import { HeaderComponent } from './components/header/header.component';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ProductCardComponent,
    TuiInputModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    FormsModule,
    TuiSvgModule,
    RouterOutlet,
    RouterLinkWithHref
  ]
})
export class MainModule { }
