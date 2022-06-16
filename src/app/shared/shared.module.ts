import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentsModule} from './components/components.module';
import {MaterialModule} from './material/material.module';
import {PipesModule} from './pipes/pipes.module';
import {ValidatorsModule} from './validators/validators.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialModule,
    PipesModule,
    ValidatorsModule
  ],
  exports: [
    ComponentsModule,
    MaterialModule,
    PipesModule,
    ValidatorsModule
  ]
})
export class SharedModule {
}
