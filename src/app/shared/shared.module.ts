import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipesModule} from './pipes/pipes.module';
import {ValidatorsModule} from './validators/validators.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PipesModule,
    ValidatorsModule
  ],
  exports: [
    PipesModule,
    ValidatorsModule
  ]
})
export class SharedModule {
}
