import {Component, OnInit} from '@angular/core';
import {Quote} from "../../models/quote";
import {
  BehaviorSubject,
  debounceTime, delay,
  distinctUntilChanged,
  map,
  Observable,
  startWith, switchMap, take
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
import {QuoteSuggestedComponent} from "./components/quote-suggested.component";

@Component({
  selector: 'sf-quotes',
  template: `
    <div sfContainerSmall>

      <sf-quote-header (onSearch)="handleOnSearch($event)" (onClickNew)="handleClickNew($event)"></sf-quote-header>

      <ng-container *ngIf="filteredQuotes$ | async as quotes; else loading">
        <sf-quote-search-status [results]="quotes.length"></sf-quote-search-status>

        <sf-quote-list
          *ngFor="let quote of quotes;"
          [quote]="quote"
          (onClickCopy)="handleClickCopy($event)"
          (onClickEdit)="handleClickEdit($event)"
          (onClickDelete)="handleClickDelete($event)"
        ></sf-quote-list>

        <sf-quote-empty *ngIf="!(allQuotes$ | async)?.length"></sf-quote-empty>
      </ng-container>

      <ng-template #loading>
        <mat-progress-bar mode="query"></mat-progress-bar>
      </ng-template>

    </div>
  `,
  styles: []
})
export class QuotesComponent implements OnInit {

  // TODO: We should avoid accessing directly the value from a behavior subject whenever possible.
  //  @link https://stackoverflow.com/questions/37089977/how-to-get-current-value-of-rxjs-subject-or-observable

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

    // TODO: The suggested quote from the snackbar will be printed every time that the user lands on this route.
    //  Is it ok, or do we wanna ask for a new one every X amount of time??
    // TODO: Is this the best way to output data from a snackbar??
    //  @link https://stackoverflow.com/questions/45647974/how-to-emit-event-when-using-snack-bar-entrycomponents-in-angular2
    this._quoteService.getSuggestedQuote().pipe(delay(3000)).subscribe(quote => {
      this._snackBar.openFromComponent(QuoteSuggestedComponent, {
        ...snackBarConfiguration,
        duration: 0,
        data: {quote: quote}
      }).instance.onClickAdd$.pipe(take(1)).subscribe(suggestedQuote => {
        this._quoteService.newQuote(suggestedQuote).subscribe(newQuoteResponse => {
          this.allQuotes$.next([newQuoteResponse, ...this.allQuotes$.value])

          this._snackBar.open('Suggested quoted added.', '💡', snackBarConfiguration);
        })
      })
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
