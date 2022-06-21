import {Component, OnInit} from '@angular/core';
import {Quote} from "../../models/quote";
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith, switchMap
} from "rxjs";
import {QuoteService} from "../../api/quote.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatDialog} from "@angular/material/dialog";
import {DialogConfirmComponent} from "../../shared/components/dialog-confirm.component";
import {DialogConfirm} from "../../models/dialog";
import {snackBarConfiguration} from "../../shared/configurations/snack-bar";
import {QuoteFormComponent} from "./components/quote-form.component";
import {quotesFilter} from "./utilities/quotes-filter";

@Component({
  selector: 'sf-quotes',
  template: `
    <div sfContainerSmall>

      <sf-quote-header (onSearch)="handleOnSearch($event)" (onClickNew)="handleClickNew($event)"></sf-quote-header>

      <ng-container *ngIf="filteredQuotes$ | async as quotes;">
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

  allQuotes$: BehaviorSubject<Quote[]> = new BehaviorSubject<Quote[]>([]);

  search$: Observable<any> | null = null;

  filteredQuotes$: Observable<Quote[]> | null = null;

  constructor(
    private _quoteService: QuoteService,
    private _clipboard: Clipboard,
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this._quoteService.getQuotes().subscribe(quotes => {
      this.allQuotes$.next(quotes);
    })
  }

  handleOnSearch(search$: Observable<any>) {
    this.search$ = search$;

    this.filteredQuotes$ = this.search$.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(search => {
        return this.allQuotes$.pipe(
          map(quotes => {
            if ('string' !== typeof search || !search.length)
              return quotes;

            return quotesFilter(quotes, search);
          })
        )
      })
    );
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
          this.allQuotes$.next([newQuoteResponse, ...this.allQuotes$.value])

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
          this.allQuotes$.next(
            this.allQuotes$.value.map(q => {
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
          this.allQuotes$.next(
            this.allQuotes$.value.filter(q => {
              return q.id !== deleteQuote.id
            })
          )

          this._snackBar.open('Quote deleted.', '🧹', snackBarConfiguration);
        })
      })
  }

}
