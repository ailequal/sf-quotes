import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DebugRoutingModule} from './debug-routing.module';

import {DebugComponent} from './debug.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    DebugComponent
  ],
  imports: [
    CommonModule,
    DebugRoutingModule,
    SharedModule
  ]
})
export class DebugModule {
}
