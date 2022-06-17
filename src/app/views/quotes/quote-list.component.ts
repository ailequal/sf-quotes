import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sf-quote-list',
  template: `
    <mat-card class="mb-4">
      <mat-card-content>{{content}}</mat-card-content>

      <div class="flex justify-between items-center">
        <mat-card-subtitle style="margin: 0;" class="text-left text-xl">{{author}}</mat-card-subtitle>

        <div>
          <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="The more vert icon.">
            <mat-icon>more_vert</mat-icon>
          </button>

          <mat-menu #menu="matMenu">
            <button mat-menu-item>
              <mat-icon>content_copy</mat-icon>
              <span>Copy</span>
            </button>

            <button mat-menu-item>
              <mat-icon>edit_note</mat-icon>
              <span>Edit</span>
            </button>

            <button mat-menu-item>
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

  @Input() content: string | null = null;

  @Input() author: string | null = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
