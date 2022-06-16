import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContainerDirective} from './container.directive';
import {ContainerSmallDirective} from './container-small.directive';

@NgModule({
  declarations: [
    ContainerDirective,
    ContainerSmallDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContainerDirective,
    ContainerSmallDirective
  ]
})
export class DirectivesModule {
}
