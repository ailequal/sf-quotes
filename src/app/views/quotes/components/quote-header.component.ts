import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'sf-quote-header',
  template: `
    <div class="mb-6 text-center">
      <h2>Your saved quotes</h2>

      <div class="lg:flex lg:justify-between lg:items-center lg:flex-row-reverse">

        <form
          [formGroup]="searchForm"
          novalidate
          class="lg:w-2/5 mb-3 lg:mb-0"
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
export class QuoteHeaderComponent implements OnInit, OnDestroy {

  // TODO: Would it be better if I output the search observable instead of its emission?
  //  We would have more control on the data flow, but it must be handled well on the parent component.

  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>()

  @Output() onClickNew: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()

  searchForm = this._fb.group({
    search: ['']
  });

  searchSub: Subscription | null = null;

  get search() {
    return this.searchForm.get('search')
  }

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (!this.search)
      return;

    this.searchSub = this.search.valueChanges.subscribe(search => {
      search = !search ? '' : String(search); // It always returns a string.

      this.onSearch.emit(search)
    })
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe()
  }

}
