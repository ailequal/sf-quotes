import {Component, OnInit} from '@angular/core';
import {delay, ReplaySubject, Subject, take} from "rxjs";
import {Quote} from "../../models/quote";
import {QuoteService} from "../../api/quote.service";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {snackBarConfiguration} from "../../shared/configurations/snack-bar";
import {DialogConfirmComponent} from "../../shared/components/dialog-confirm.component";
import {DialogConfirm} from "../../models/dialog";

@Component({
  selector: 'sf-discover',
  template: `
    <div sfContainerSmall>

      <sf-discover-header></sf-discover-header>

      <ng-container *ngIf="suggestedQuotes$ | async as quotes; else loading">
        <sf-discover-list
          *ngFor="let quote of quotes; index as i;"
          [quote]="quote"
          (onClickCopy)="handleClickCopy($event)"
          (onClickAdd)="handleClickAdd($event, i)"
          (onClickDiscard)="handleClickDiscard($event, i)"
        ></sf-discover-list>

        <sf-discover-empty *ngIf="!quotes.length"></sf-discover-empty>
      </ng-container>

      <ng-template #loading>
        <mat-progress-bar mode="query"></mat-progress-bar>
      </ng-template>

    </div>
  `,
  styles: []
})
export class DiscoverComponent implements OnInit {

  // TODO: In this component we don't rely directly on the value of the subject, but is this way ok?
  //  @link https://stackoverflow.com/questions/62262008/rxjs-behaviorsubject-proper-use-of-value

  suggestedQuotes$: ReplaySubject<Omit<Quote, 'id'>[]> = new ReplaySubject<Omit<Quote, "id">[]>(1)

  constructor(
    private _quoteService: QuoteService,
    private _clipboard: Clipboard,
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this._quoteService.getSuggestedQuotes(6).pipe(delay(300)).subscribe(quotes => {
      this.suggestedQuotes$.next(quotes);
    })
  }

  handleClickCopy(quote: Omit<Quote, 'id'>) {
    this._clipboard.copy(`${quote.content}\n( ${quote.author} )`)

    this._snackBar.open('Quote copied to the clipboard.', '📋', snackBarConfiguration);
  }

  handleClickAdd(addQuote: Omit<Quote, 'id'>, addQuoteIndex: number) {
    const dialogRef = this._dialog.open<DialogConfirmComponent, DialogConfirm>(DialogConfirmComponent, {
      data: {
        title: 'Add quote',
        content: `Do you really want to add this quote written by ${addQuote.author}?`,
        cancelLabel: 'Cancel',
        confirmLabel: 'Add',
      }
    })

    dialogRef.afterClosed().subscribe(
      response => {
        if (!response) return;

        this._quoteService.newQuote(addQuote).subscribe(newQuoteResponse => {
          this.replaceQuote(addQuoteIndex);

          this._snackBar.open('Suggested quoted added.', '💡', snackBarConfiguration);
        })
      })
  }

  handleClickDiscard(discardQuote: Omit<Quote, "id">, discardQuoteIndex: number) {
    const dialogRef = this._dialog.open<DialogConfirmComponent, DialogConfirm>(DialogConfirmComponent, {
      data: {
        title: 'Discard quote',
        content: `Do you really want to discard this quote written by ${discardQuote.author}?`,
        cancelLabel: 'Cancel',
        confirmLabel: 'Discard',
      }
    })

    dialogRef.afterClosed().subscribe(
      response => {
        if (!response) return;

        this.replaceQuote(discardQuoteIndex);

        this._snackBar.open('Suggested quoted discarded.', '💡', snackBarConfiguration);
      });
  }

  replaceQuote(quoteIndex: number) {
    // TODO: This works, but it's ugly and nor reactive as it should be.
    this.suggestedQuotes$.pipe(take(1)).subscribe(quotes => {
      this._quoteService.getSuggestedQuote().subscribe(newSuggestedQuote => {
        const updatedSuggestedQuotes = [newSuggestedQuote, ...(quotes.filter((element, index) => {
          return index !== quoteIndex;
        }))];

        this.suggestedQuotes$.next(updatedSuggestedQuotes);
      });
    });
  }

}
