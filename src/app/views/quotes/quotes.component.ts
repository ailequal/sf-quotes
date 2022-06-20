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
import {QuoteFormComponent} from "./components/quote-form.component";

@Component({
  selector: 'sf-quotes',
  template: `
    <div sfContainerSmall>

      <sf-quote-header (onSearch)="handleOnSearch($event)" (onClickNew)="handleClickNew($event)"></sf-quote-header>

      <ng-container *ngIf="quotes$ | async | quotesFilter: search as quotes;">
        <sf-quote-list
          *ngFor="let quote of quotes;"
          [quote]="quote"
          (onClickCopy)="handleClickCopy($event)"
          (onClickEdit)="handleClickEdit($event)"
          (onClickDelete)="handleClickDelete($event)"
        ></sf-quote-list>

        <sf-quote-empty *ngIf="!quotes.length"></sf-quote-empty>
      </ng-container>

    </div>
  `,
  styles: []
})
export class QuotesComponent implements OnInit {

  search: string = '';

  quotes$: BehaviorSubject<Quote[]> = new BehaviorSubject<Quote[]>([]);

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

  handleClickNew($event: MouseEvent) {
    const dialogRef = this._dialog.open<QuoteFormComponent, { quote: Quote | null }>(QuoteFormComponent, {
      data: {
        quote: null
      }
    });

    dialogRef.afterClosed().subscribe(
      newQuote => {
        if (!newQuote) return;

        this._quoteService.newQuote(newQuote).subscribe(newQuoteResponse => {
          this.quotes$.next([newQuoteResponse, ...this.quotes$.value])

          this._snackBar.open('Quote created.', '🎉', snackBarConfiguration);
        })
      })
  }

  handleClickCopy(quote: Quote) {
    this._clipboard.copy(`${quote.content}\n( ${quote.author} )`)

    this._snackBar.open('Quote copied to the clipboard.', '📋', snackBarConfiguration);
  }

  handleClickEdit(editQuote: Quote) {
    const dialogRef = this._dialog.open<QuoteFormComponent, { quote: Quote | null }>(QuoteFormComponent, {
      data: {
        quote: editQuote
      }
    });

    dialogRef.afterClosed().subscribe(
      editedQuote => {
        if (!editedQuote) return;

        this._quoteService.editQuote(editQuote.id, editedQuote).subscribe(editQuoteResponse => {
          this.quotes$.next(
            this.quotes$.value.map(q => {
              return (q.id !== editQuoteResponse.id) ? q : editQuoteResponse
            })
          )

          this._snackBar.open('Quote edited.', '✍️', snackBarConfiguration);
        })
      })
  }

  handleClickDelete(deleteQuote: Quote) {
    const dialogRef = this._dialog.open<DialogConfirmComponent, DialogConfirm>(DialogConfirmComponent, {
      data: {
        title: 'Delete quote',
        content: `Do you really want to delete this quote written by ${deleteQuote.author}?`,
        cancelLabel: 'Cancel',
        confirmLabel: 'Delete',
      }
    });

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

  handleOnSearch(search: string) {
    this.search = search;
  }

}
