import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { TuiFormatNumberPipeModule } from '@taiga-ui/core';
import { TuiTagModule } from '@taiga-ui/kit';


@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    TuiFormatNumberPipeModule,
    TuiTagModule
  ]
})
export class AccountModule { }
