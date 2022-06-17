import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sf-quote-header',
  template: `
    <div class="mb-6 text-center">
      <h2>Your saved quotes</h2>

      <button mat-raised-button color="accent">
        Feeling inspired? Add a new one!
      </button>
    </div>
  `,
  styles: []
})
export class QuoteHeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
