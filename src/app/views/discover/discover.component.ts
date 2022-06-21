import {Component, OnInit} from '@angular/core';
import {delay, Subject} from "rxjs";
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
          *ngFor="let quote of quotes;"
          [quote]="quote"
          (onClickCopy)="handleClickCopy($event)"
          (onClickAdd)="handleClickAdd($event)"
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

  suggestedQuotes$: Subject<Omit<Quote, 'id'>[]> = new Subject<Omit<Quote, "id">[]>()

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

  handleClickAdd(addQuote: Omit<Quote, 'id'>) {
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
          this._snackBar.open('Suggested quoted added.', '💡', snackBarConfiguration);
        })
      })
  }

}
