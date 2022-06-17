import {Component, OnInit} from '@angular/core';
import {Quote} from "../../models/quote";

@Component({
  selector: 'sf-quotes',
  template: `
    <div sfContainerSmall>

      <sf-quote-list *ngFor="let quote of quotes;" [content]="quote.content" [author]="quote.author"></sf-quote-list>

    </div>
  `,
  styles: []
})
export class QuotesComponent implements OnInit {

  quotes: Quote[] = [
    {
      id: 48,
      content: 'Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.',
      author: 'Marie Curie'
    },
    {
      id: 49,
      content: 'Every man dies. Not every man really lives.',
      author: 'William Wallace'
    },
    {
      id: 50,
      content: 'I have found that if you love life, life will love you back.',
      author: 'Arthur Rubinstein'
    }
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
