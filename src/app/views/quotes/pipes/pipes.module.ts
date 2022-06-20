import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {QuotesFilterPipe} from "./quotes-filter.pipe";

@NgModule({
  declarations: [
    QuotesFilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    QuotesFilterPipe
  ]
})
export class PipesModule {
}
