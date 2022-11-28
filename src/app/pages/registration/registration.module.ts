import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';


@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiInputPasswordModule
  ]
})
export class RegistrationModule { }
