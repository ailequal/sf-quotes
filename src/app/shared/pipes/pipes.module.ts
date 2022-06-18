import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FilterQuotesPipe} from "./filter-quotes.pipe";

@NgModule({
  declarations: [
    FilterQuotesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterQuotesPipe
  ]
})
export class PipesModule {
}
