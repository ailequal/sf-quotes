import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Quote} from "../../../models/quote";

@Component({
  selector: 'sf-quote-form-dialog',
  template: `
    <sf-quote-form
      [initialQuote]="initialQuote"
      (onClickCancel)="handleClickCancel($event)"
      (onClickAddEdit)="handleClickAddEdit($event)"
    >
    </sf-quote-form>
  `,
  styles: []
})
export class QuoteFormDialogComponent implements OnInit {

  initialQuote: Quote | null = this.data.quote

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { quote: Quote | null },
    private _dialogRef: MatDialogRef<QuoteFormDialogComponent>
  ) {
  }

  ngOnInit(): void {
  }

  handleClickCancel($event: false) {
    this._dialogRef.close($event);
  }

  handleClickAddEdit($event: Omit<Quote, 'uid' | 'userUid' | 'timestamp'>) {
    this._dialogRef.close($event);
  }

}
