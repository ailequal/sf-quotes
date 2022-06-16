import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material/material.module';
import {PipesModule} from './pipes/pipes.module';
import {ValidatorsModule} from './validators/validators.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    ValidatorsModule
  ],
  exports: [
    MaterialModule,
    PipesModule,
    ValidatorsModule
  ]
})
export class SharedModule {
}
