import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";
import {Quote} from "../../../models/quote";
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

  quote: Omit<Quote, 'userUid'> = this.data.quote

  onClickAdd$: Subject<Omit<Quote, 'userUid'>> = new Subject<Omit<Quote, "userUid">>();

  constructor(
    private _snackBarRef: MatSnackBarRef<QuoteSuggestedComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: { quote: Omit<Quote, 'userUid'> }
  ) {
  }

  ngOnInit(): void {
  }

  handleClickCancel($event: MouseEvent) {
    this._snackBarRef.dismiss();
  }

  handleClickAdd(quote: Omit<Quote, "userUid">) {
    this.onClickAdd$.next(quote);
    this._snackBarRef.dismiss();
  }

}
