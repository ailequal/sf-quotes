import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentsModule} from './components/components.module';
import {DirectivesModule} from './directives/directives.module';
import {MaterialModule} from './material/material.module';
import {PipesModule} from './pipes/pipes.module';
import {ValidatorsModule} from './validators/validators.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    MaterialModule,
    PipesModule,
    ValidatorsModule
  ],
  exports: [
    ComponentsModule,
    DirectivesModule,
    MaterialModule,
    PipesModule,
    ValidatorsModule
  ]
})
export class SharedModule {
}
