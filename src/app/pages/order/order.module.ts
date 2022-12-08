import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputDateModule, TuiInputModule, TuiRadioLabeledModule, TuiRadioModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiFormatNumberPipeModule } from '@taiga-ui/core';
import { AuthorPipe } from '../../pipes/author.pipe';


@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiRadioModule,
    TuiRadioLabeledModule,
    TuiButtonModule,
    TuiInputDateModule,
    TuiFormatNumberPipeModule,
    AuthorPipe
  ]
})
export class OrderModule { }
