import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuotesRoutingModule} from './quotes-routing.module';
import {SharedModule} from "../../shared/shared.module";

import {QuotesComponent} from './quotes.component';
import {QuoteListComponent} from './components/quote-list.component';
import {QuoteNewComponent} from './components/quote-new.component';
import {QuoteEditComponent} from './components/quote-edit.component';

@NgModule({
  declarations: [
    QuotesComponent,
    QuoteListComponent,
    QuoteNewComponent,
    QuoteEditComponent
  ],
  imports: [
    CommonModule,
    QuotesRoutingModule,
    SharedModule
  ]
})
export class QuotesModule {
}
