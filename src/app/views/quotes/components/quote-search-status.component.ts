import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sf-quote-search-status',
  template: `
    <h3 class="text-right">
      Quotes: <b>{{results}}</b>
    </h3>
  `,
  styles: []
})
export class QuoteSearchStatusComponent implements OnInit {

  @Input() results: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

}
