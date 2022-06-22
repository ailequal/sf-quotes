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

        <button (click)="onClickHelp.emit($event)" mat-icon-button aria-label="The help icon.">
          <mat-icon>help</mat-icon>
        </button>

      </div>
    </mat-toolbar>
  `,
  styles: []
})
export class ToolbarComponent implements OnInit {

  @Output() onClickMenu: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()

  @Output() onClickHelp: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()

  constructor() {
  }

  ngOnInit(): void {
  }

}
