import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quote} from "../../models/quote";

@Component({
  selector: 'sf-quote-list',
  template: `
    <mat-card class="mb-4">
      <mat-card-content class="text-lg">{{quote.content}}</mat-card-content>

      <div class="flex justify-between items-center">
        <mat-card-subtitle style="margin: 0;" class="text-left text-xl">{{quote.author}}</mat-card-subtitle>

        <div>
          <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="The more vert icon.">
            <mat-icon>more_vert</mat-icon>
          </button>

          <mat-menu #menu="matMenu">
            <button (click)="onClickCopy.emit(quote)" mat-menu-item>
              <mat-icon>content_copy</mat-icon>
              <span>Copy</span>
            </button>

            <button (click)="onClickEdit.emit(quote)" mat-menu-item>
              <mat-icon>edit_note</mat-icon>
              <span>Edit</span>
            </button>

            <button (click)="onClickDelete.emit(quote)" mat-menu-item>
              <mat-icon>delete</mat-icon>
              <span>Delete</span>
            </button>
          </mat-menu>
        </div>
      </div>
    </mat-card>
  `,
  styles: []
})
export class QuoteListComponent implements OnInit {

  @Input() quote!: Quote;

  @Output() onClickCopy: EventEmitter<Quote> = new EventEmitter<Quote>()

  @Output() onClickEdit: EventEmitter<Quote> = new EventEmitter<Quote>()

  @Output() onClickDelete: EventEmitter<Quote> = new EventEmitter<Quote>()

  constructor() {
  }

  ngOnInit(): void {
  }

}
