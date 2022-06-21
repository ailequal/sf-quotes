import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sf-discover-empty',
  template: `
    <mat-card class="mb-4">
      <mat-card-title class="text-center text-xl">
        We cannot find any new quotes to suggest to you, sorry.
      </mat-card-title>

      <mat-card-actions class="text-center">
        <button routerLink="/" mat-raised-button color="basic">
          Go back to your quotes
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: []
})
export class DiscoverEmptyComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
