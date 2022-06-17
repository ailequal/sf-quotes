import {Component, OnInit} from '@angular/core';
import {Quote} from "../../models/quote";
import {BehaviorSubject} from "rxjs";
import {QuoteService} from "../../api/quote.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Clipboard} from "@angular/cdk/clipboard";

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
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this._quoteService.getQuotes().subscribe(quotes => {
      this.quotes$.next(quotes)
    })
  }

  handleClickCopy(quote: Quote) {
    this._clipboard.copy(`"${quote.content}" - ${quote.author}`)

    this._snackBar.open('Quote copied to the clipboard.', '📋', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3000
    });
  }

  handleClickEdit(editQuote: Quote) {
    // TODO: This code works, but we do not have the editQuote actually here yet.

    this._quoteService.editQuote(editQuote.id, editQuote).subscribe(editQuoteResponse => {
      this.quotes$.next(
        this.quotes$.value.map(q => {
          return (q.id !== editQuoteResponse.id) ? q : editQuoteResponse
        })
      )

      this._snackBar.open('Quote edited.', '✍️', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 3000
      });
    })
  }

  handleClickDelete(deleteQuote: Quote) {
    this._quoteService.deleteQuote(deleteQuote.id).subscribe(v => {
      this.quotes$.next(
        this.quotes$.value.filter(q => {
          return q.id !== deleteQuote.id
        })
      )

      this._snackBar.open('Quote deleted.', '🧹', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 3000
      });
    })
  }

}
