import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

import {ToolbarComponent} from './components/toolbar.component';
import {ToolbarListComponent} from './components/toolbar-list.component';
import {HelpDialogComponent} from './components/help-dialog.component';
import {CopyrightComponent} from './components/copyright.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    ToolbarListComponent,
    HelpDialogComponent,
    CopyrightComponent
  ],
  exports: [
    ToolbarComponent,
    ToolbarListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class CoreModule {
}
