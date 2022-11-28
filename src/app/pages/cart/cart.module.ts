import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { TuiButtonModule, TuiFormatNumberPipeModule } from '@taiga-ui/core';
import { AuthorPipe } from '../../pipes/author.pipe';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    TuiButtonModule,
    AuthorPipe,
    TuiFormatNumberPipeModule
  ]
})
export class CartModule { }
