import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContainerComponent} from "./container.component";
import {ContainerSmallComponent} from './container-small.component';

@NgModule({
  declarations: [
    ContainerComponent,
    ContainerSmallComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContainerComponent,
    ContainerSmallComponent
  ]
})
export class ComponentsModule {
}
