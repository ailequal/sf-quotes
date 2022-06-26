import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";
import {SuggestedQuote} from "../../../models/quote";
import {Subject} from "rxjs";

@Component({
  selector: 'sf-quote-suggested',
  template: `
    <div>
      <span class="block">{{quote.content}}</span>
      <span class="block">( {{quote.author}} )</span>
    </div>

    <div class="text-right">
      <button (click)="handleClickCancel($event)" mat-button>Discard</button>
      <button (click)="handleClickAdd(quote)" mat-raised-button color="primary">Add</button>
    </div>
  `,
  styles: []
})
export class QuoteSuggestedComponent implements OnInit {

  quote: SuggestedQuote = this.data.quote

  onClickAdd$: Subject<SuggestedQuote> = new Subject<SuggestedQuote>();

  constructor(
    private _snackBarRef: MatSnackBarRef<QuoteSuggestedComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: { quote: SuggestedQuote }
  ) {
  }

  ngOnInit(): void {
  }

  handleClickCancel($event: MouseEvent) {
    this._snackBarRef.dismiss();
  }

  handleClickAdd(quote: SuggestedQuote) {
    this.onClickAdd$.next(quote);
    this._snackBarRef.dismiss();
  }

}
