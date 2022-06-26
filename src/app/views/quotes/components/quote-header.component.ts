import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'sf-quote-header',
  template: `
    <div class="mb-6 text-center">
      <h2>Your saved quotes</h2>

      <div class="lg:flex lg:justify-between lg:items-center lg:flex-row-reverse">

        <form
          [formGroup]="searchForm"
          novalidate
          class="w-4/5 lg:w-2/5 mx-auto mb-3 lg:mb-0"
          (keydown.enter)="$event.preventDefault()"
        >
          <div mat-dialog-content>

            <mat-form-field class="w-full" appearance="outline">
              <mat-label>Search</mat-label>
              <input
                type="text"
                matInput
                placeholder="..."
                formControlName="search"
              >
              <mat-icon *ngIf="!search?.value" matSuffix>search</mat-icon>
              <button *ngIf="search?.value" matSuffix mat-icon-button aria-label="Clear" (click)="search?.reset()">
                <mat-icon>close</mat-icon>
              </button>
              <mat-hint>Search by quote or author.</mat-hint>
            </mat-form-field>

          </div>
        </form>

        <button (click)="onClickNew.emit($event)" mat-raised-button color="accent">
          Feeling inspired? Add a new one!
        </button>

      </div>
    </div>
  `,
  styles: []
})
export class QuoteHeaderComponent implements OnInit {

  @Output() onSearch: EventEmitter<Observable<any>> = new EventEmitter<Observable<any>>()

  @Output() onClickNew: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()

  searchForm = this._fb.group({
    search: ['']
  });

  get search() {
    return this.searchForm.get('search')
  }

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (!this.search)
      return;

    this.onSearch.emit(this.search.valueChanges)
  }

}
