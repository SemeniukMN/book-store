import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProductCardComponent } from '../../product/product-card/product-card.component';
import { FiltersComponent } from './components/filters/filters.component';
import {
  TuiDataListWrapperModule,
  TuiMultiSelectModule,
  TuiMultiSelectOptionModule,
  TuiSelectModule
} from '@taiga-ui/kit';
import { TuiButtonModule, TuiLabelModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { AuthorHandlerDirective } from './directives/author-handler.directive';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    FiltersComponent,
    AuthorHandlerDirective
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ProductCardComponent,
    TuiSelectModule,
    TuiMultiSelectOptionModule,
    TuiMultiSelectModule,
    TuiDataListWrapperModule,
    TuiTextfieldControllerModule,
    TuiLabelModule,
    ReactiveFormsModule,
    TuiButtonModule
  ]
})
export class HomeModule { }
