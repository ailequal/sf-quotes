import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sf-quote-empty',
  template: `
    <mat-card class="mb-4">
      <mat-card-title class="text-center text-xl">
        You don't have any quotes saved yet...
      </mat-card-title>

      <mat-card-actions class="text-center">
        <button routerLink="/discover" mat-raised-button color="basic">
          Need some ideas? I can help.
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: []
})
export class QuoteEmptyComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
