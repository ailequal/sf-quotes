import {Pipe, PipeTransform} from '@angular/core';
import {Quote} from "../../../models/quote";
import {quotesFilter} from "../utilities/quotes-filter";

@Pipe({
  name: 'quotesFilter'
})
export class QuotesFilterPipe implements PipeTransform {

  transform(quotes: Quote[] | null, search: string): Quote[] {
    if (!Array.isArray(quotes))
      return [];

    return quotesFilter(quotes, search);
  }

}
