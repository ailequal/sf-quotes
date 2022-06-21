import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quote} from "../../../models/quote";

@Component({
  selector: 'sf-discover-list',
  template: `
    <mat-card class="mb-4">
      <mat-card-content class="text-lg">{{quote.content}}</mat-card-content>

      <div class="flex justify-between items-center">
        <mat-card-subtitle style="margin: 0;" class="text-left text-xl">( {{quote.author}} )</mat-card-subtitle>

        <div>
          <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="The more vert icon.">
            <mat-icon>more_vert</mat-icon>
          </button>

          <mat-menu #menu="matMenu">
            <button (click)="onClickCopy.emit(quote)" mat-menu-item>
              <mat-icon>content_copy</mat-icon>
              <span>Copy</span>
            </button>

            <button (click)="onClickAdd.emit(quote)" mat-menu-item>
              <mat-icon>add</mat-icon>
              <span>Add</span>
            </button>

            <button (click)="onClickDiscard.emit(quote)" mat-menu-item>
              <mat-icon>close</mat-icon>
              <span>Discard</span>
            </button>
          </mat-menu>
        </div>
      </div>
    </mat-card>
  `,
  styles: []
})
export class DiscoverListComponent implements OnInit {

  @Input() quote!: Omit<Quote, 'id'>;

  @Output() onClickCopy: EventEmitter<Omit<Quote, 'id'>> = new EventEmitter<Omit<Quote, 'id'>>()

  @Output() onClickAdd: EventEmitter<Omit<Quote, 'id'>> = new EventEmitter<Omit<Quote, 'id'>>()

  @Output() onClickDiscard: EventEmitter<Omit<Quote, 'id'>> = new EventEmitter<Omit<Quote, 'id'>>()

  constructor() {
  }

  ngOnInit(): void {
  }

}
