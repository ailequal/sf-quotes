import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuotesRoutingModule} from './quotes-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {PipesModule} from './pipes/pipes.module';

import {QuotesComponent} from './quotes.component';
import {QuoteListComponent} from './components/quote-list.component';
import {QuoteEmptyComponent} from './components/quote-empty.component';
import {QuoteHeaderComponent} from './components/quote-header.component';
import {QuoteFormComponent} from './components/quote-form.component';
import {QuoteSearchStatusComponent} from './components/quote-search-status.component';
import {QuoteSuggestedComponent} from './components/quote-suggested.component';

@NgModule({
  declarations: [
    QuotesComponent,
    QuoteListComponent,
    QuoteEmptyComponent,
    QuoteHeaderComponent,
    QuoteFormComponent,
    QuoteSearchStatusComponent,
    QuoteSuggestedComponent
  ],
  imports: [
    CommonModule,
    QuotesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    PipesModule
  ]
})
export class QuotesModule {
}
