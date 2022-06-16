import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sf-toolbar',
  template: `
    <mat-toolbar color="primary">
      <div class="flex items-center" sfContainer>
        <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
          <mat-icon>menu</mat-icon>
        </button>
        <span>sf-quotes</span>
        <span class="flex-auto"></span>
        <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
          <mat-icon>favorite</mat-icon>
        </button>
        <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
          <mat-icon>share</mat-icon>
        </button>
      </div>
    </mat-toolbar>
  `,
  styles: []
})
export class ToolbarComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
