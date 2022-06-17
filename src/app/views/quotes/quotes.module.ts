import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuotesRoutingModule} from './quotes-routing.module';
import {SharedModule} from "../../shared/shared.module";

import {QuotesComponent} from './quotes.component';
import {QuoteListComponent} from './quote-list.component';

@NgModule({
  declarations: [
    QuotesComponent,
    QuoteListComponent
  ],
  imports: [
    CommonModule,
    QuotesRoutingModule,
    SharedModule
  ]
})
export class QuotesModule {
}
