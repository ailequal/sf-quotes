import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'sf-quote-header',
  template: `
    <div class="mb-6 text-center">
      <h2>Your saved quotes</h2>

      <button (click)="onClickNew.emit($event)" mat-raised-button color="accent">
        Feeling inspired? Add a new one!
      </button>
    </div>
  `,
  styles: []
})
export class QuoteHeaderComponent implements OnInit {

  @Output() onClickNew: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()

  constructor() {
  }

  ngOnInit(): void {
  }

}
