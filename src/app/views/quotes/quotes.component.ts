import {Component, OnDestroy, OnInit} from '@angular/core';
import {Quote} from "../../models/quote";
import {
  debounceTime, delay,
  distinctUntilChanged,
  map,
  Observable,
  startWith, switchMap, take
} from "rxjs";
import {QuoteService} from "../../api/quote.service";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatDialog} from "@angular/material/dialog";
import {DialogConfirmComponent} from "../../shared/components/dialog-confirm.component";
import {DialogConfirm} from "../../models/dialog";
import {QuoteFormDialogComponent} from "./components/quote-form-dialog.component";
import {quotesFilter} from "./utilities/quotes-filter";
import {QuoteSuggestedComponent} from "./components/quote-suggested.component";
import {CookieService} from "../../api/cookie.service";
import {AuthService} from "../../api/auth.service";
import {Guest, User} from "../../models/user";

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

        <ng-container *ngIf="allQuotes$ | async as allQuotes;">
          <sf-quote-empty *ngIf="!allQuotes.length"></sf-quote-empty>
        </ng-container>
      </ng-container>

      <ng-template #loading>
        <mat-progress-bar mode="query"></mat-progress-bar>
      </ng-template>

    </div>
  `,
  styles: []
})
export class QuotesComponent implements OnInit, OnDestroy {

  // TODO: Consider adding a quote item component (single view of a quote).

  allQuotes$: Observable<Quote[]> | null = null;

  search$: Observable<any> | null = null;

  filteredQuotes$: Observable<Quote[]> | null = null;

  user$: Observable<User | Guest> = this._authService.user$;

  quoteSuggestedSnackBarRef: MatSnackBarRef<QuoteSuggestedComponent> | null = null;

  constructor(
    private _clipboard: Clipboard,
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog,
    private _authService: AuthService,
    private _quoteService: QuoteService,
    private _cookieService: CookieService
  ) {
  }

  ngOnInit(): void {
    this.allQuotes$ = this._quoteService.getQuotes();

    this.suggestQuote();
  }

  handleOnSearch(search$: Observable<any>) {
    this.search$ = search$;

    this.filteredQuotes$ = this.search$.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(search => {
        return this.allQuotes$!.pipe(
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
    const dialogRef = this._dialog.open<QuoteFormDialogComponent, { quote: Quote | null }>(QuoteFormDialogComponent, {
      data: {
        quote: null
      }
    });

    dialogRef.afterClosed().subscribe(
      newQuote => {
        if (!newQuote) return;

        this._quoteService.newQuote(newQuote).subscribe(newQuoteResponse => {
          this._snackBar.open('Quote created.', '🎉');
        })
      })
  }

  handleClickCopy(quote: Quote) {
    this._clipboard.copy(`${quote.content}\n( ${quote.author} )`)

    this._snackBar.open('Quote copied to the clipboard.', '📋');
  }

  handleClickEdit(editQuote: Quote) {
    const dialogRef = this._dialog.open<QuoteFormDialogComponent, { quote: Quote | null }>(QuoteFormDialogComponent, {
      data: {
        quote: editQuote
      }
    });

    dialogRef.afterClosed().subscribe(
      editedQuote => {
        if (!editedQuote) return;

        this._quoteService.editQuote(editQuote.uid, editedQuote).subscribe(editQuoteResponse => {
          this._snackBar.open('Quote edited.', '✍️');
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

        this._quoteService.deleteQuote(deleteQuote.uid).subscribe(v => {
          this._snackBar.open('Quote deleted.', '🧹');
        })
      })
  }

  suggestQuote() {
    // TODO: Is this the best way to output data from a snackbar??
    //  @link https://stackoverflow.com/questions/45647974/how-to-emit-event-when-using-snack-bar-entrycomponents-in-angular2
    // Each user has its own unique cookie.
    this.user$.pipe(take(1)).subscribe(user => {
      const suggestedQuoteCookieName = `sf-quotes-suggestedQuote-${user.uid}`;

      const suggestedQuoteCookie = this._cookieService.getCookie(suggestedQuoteCookieName);
      if (suggestedQuoteCookie.length)
        return;

      this._quoteService.getSuggestedQuote().pipe(delay(3000)).subscribe(quote => {
        this.quoteSuggestedSnackBarRef = this._snackBar.openFromComponent(QuoteSuggestedComponent, {
          duration: 0,
          data: {quote: quote}
        });

        this.quoteSuggestedSnackBarRef.instance.onClickAdd$.pipe(take(1)).subscribe(suggestedQuote => {
          this._quoteService.newQuote(suggestedQuote).subscribe(newQuoteResponse => {
            this._snackBar.open('Suggested quoted added.', '💡');
          });
        });

        this._cookieService.newCookie({name: suggestedQuoteCookieName, value: '1'}, 60);
      })
    });
  }

  ngOnDestroy(): void {
    this.quoteSuggestedSnackBarRef?.dismiss();
  }

}
