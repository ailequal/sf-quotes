import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterQuotes'
})
export class FilterQuotesPipe implements PipeTransform {

  // TODO: Implement quote filtering properly through pipe for good performance.
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
