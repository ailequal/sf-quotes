import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'sf-toolbar',
  template: `
    <mat-toolbar color="primary">
      <div class="flex items-center" sfContainer>

        <button (click)="onClickMenu.emit($event)" mat-icon-button aria-label="The menu icon.">
          <mat-icon>menu</mat-icon>
        </button>

        <span>sf-quotes</span>

        <span class="flex-auto"></span>

        <button (click)="onClickFavorite.emit($event)" mat-icon-button aria-label="The favorite icon.">
          <mat-icon>favorite</mat-icon>
        </button>

      </div>
    </mat-toolbar>
  `,
  styles: []
})
export class ToolbarComponent implements OnInit {

  // TODO: Move the favorite part into the menu and replace it with a modal window with the main instructions of the SPA.

  @Output() onClickMenu: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()

  @Output() onClickFavorite: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()

  constructor() {
  }

  ngOnInit(): void {
  }

}
