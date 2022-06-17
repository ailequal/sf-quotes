import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../material/material.module";

import {DialogConfirmComponent} from './dialog-confirm.component';

@NgModule({
  declarations: [
    DialogConfirmComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    DialogConfirmComponent
  ]
})
export class ComponentsModule {
}
