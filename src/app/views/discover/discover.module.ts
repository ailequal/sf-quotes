import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiscoverRoutingModule} from './discover-routing.module';
import {SharedModule} from "../../shared/shared.module";

import {DiscoverComponent} from './discover.component';
import {DiscoverListComponent} from './components/discover-list.component';
import {DiscoverHeaderComponent} from './components/discover-header.component';
import {DiscoverEmptyComponent} from './components/discover-empty.component';

@NgModule({
  declarations: [
    DiscoverComponent,
    DiscoverListComponent,
    DiscoverHeaderComponent,
    DiscoverEmptyComponent
  ],
  imports: [
    CommonModule,
    DiscoverRoutingModule,
    SharedModule
  ]
})
export class DiscoverModule {
}
