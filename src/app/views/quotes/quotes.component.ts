import {Component, OnInit} from '@angular/core';
import {Quote} from "../../models/quote";
import {BehaviorSubject} from "rxjs";
import {QuoteService} from "../../api/quote.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatDialog} from "@angular/material/dialog";
import {DialogConfirmComponent} from "../../shared/components/dialog-confirm.component";
import {DialogConfirm} from "../../models/dialog";
import {snackBarConfiguration} from "../../shared/configurations/snack-bar";

@Component({
  selector: 'sf-quotes',
  template: `
    <div sfContainerSmall>

      <sf-quote-list
        *ngFor="let quote of (quotes$ | async);"
        [quote]="quote"
        (onClickCopy)="handleClickCopy($event)"
        (onClickEdit)="handleClickEdit($event)"
        (onClickDelete)="handleClickDelete($event)"
      ></sf-quote-list>

    </div>
  `,
  styles: []
})
export class QuotesComponent implements OnInit {

  quotes$: BehaviorSubject<Quote[]> = new BehaviorSubject<Quote[]>([])

  constructor(
    private _quoteService: QuoteService,
    private _clipboard: Clipboard,
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this._quoteService.getQuotes().subscribe(quotes => {
      this.quotes$.next(quotes)
    })
  }

  handleClickCopy(quote: Quote) {
    this._clipboard.copy(`"${quote.content}" - ${quote.author}`)

    this._snackBar.open('Quote copied to the clipboard.', '📋', snackBarConfiguration);
  }

  handleClickEdit(editQuote: Quote) {
    // TODO: This code works, but we do not have the editQuote actually here yet.

    this._quoteService.editQuote(editQuote.id, editQuote).subscribe(editQuoteResponse => {
      this.quotes$.next(
        this.quotes$.value.map(q => {
          return (q.id !== editQuoteResponse.id) ? q : editQuoteResponse
        })
      )

      this._snackBar.open('Quote edited.', '✍️', snackBarConfiguration);
    })
  }

  handleClickDelete(deleteQuote: Quote) {
    const dialogRef = this._dialog.open<DialogConfirmComponent, DialogConfirm>(DialogConfirmComponent, {
      data: {
        title: 'Delete quote',
        content: `Do you really want to delete this quote from ${deleteQuote.author}?`,
        cancelLabel: 'Cancel',
        confirmLabel: 'Save changes',
      }
    });

    // This observable immediately completes, so there is no need to unsubscribe manually.
    // @link https://stackoverflow.com/questions/58198544/angular-dialogref-unsubscribe-do-i-need-to-unsubscribe-from-afterclosed
    dialogRef.afterClosed().subscribe(
      response => {
        if (!response) return;

        this._quoteService.deleteQuote(deleteQuote.id).subscribe(v => {
          this.quotes$.next(
            this.quotes$.value.filter(q => {
              return q.id !== deleteQuote.id
            })
          )

          this._snackBar.open('Quote deleted.', '🧹', snackBarConfiguration);
        })
      })
  }

}
