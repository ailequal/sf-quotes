import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationLink} from "../../models/link";

@Component({
  selector: 'sf-toolbar-list',
  template: `
    <mat-selection-list #shoes [multiple]="false" class="h-full">
      <div class="flex flex-col justify-between items-center h-full">

        <div class="w-full">
          <mat-list-option
            class="my-4 text-center"
            *ngFor="let link of links"
            [value]="link.value"
            [routerLink]="link.routerLink"
            (click)="onClickNavigation.emit($event)"
          >
            {{link.title}}
          </mat-list-option>
        </div>

        <div class="w-full">
          <mat-list-option
            class="my-4 text-center"
            [value]="'ailequal'"
            (click)="onClickAuthor.emit($event)">
            🍀 ailequal
          </mat-list-option>
        </div>

      </div>
    </mat-selection-list>
  `,
  styles: []
})
export class ToolbarListComponent implements OnInit {

  @Input() links: NavigationLink[] = [];

  @Output() onClickNavigation: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Output() onClickAuthor: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
