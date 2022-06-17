import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Quote} from "../../../models/quote";

@Component({
  selector: 'sf-quote-form',
  template: `
    <form [formGroup]="quoteForm" novalidate>

      <h1 mat-dialog-title>New quote</h1>

      <div mat-dialog-content>
        <mat-form-field class="w-full" appearance="standard">
          <mat-label>Quote</mat-label>
          <textarea
            type="text"
            matInput
            placeholder="Lorem ipsum..."
            formControlName="content"
            rows="5"
          >
          </textarea>
          <mat-error *ngIf="content?.hasError('required')">
            The quote content is <strong>required</strong>.
          </mat-error>
        </mat-form-field>

        <mat-form-field class="w-full" appearance="standard">
          <mat-label>Author</mat-label>
          <input
            type="text"
            matInput
            placeholder="Anonymous"
            formControlName="author"
          >
        </mat-form-field>
      </div>

      <div mat-dialog-actions align="end">
        <button mat-button [mat-dialog-close]="false">Cancel</button>
        <button
          mat-raised-button
          color="primary"
          [mat-dialog-close]="quoteForm.value"
          [disabled]="!quoteForm.valid"
        >
          {{initialQuote ? 'Edit' : 'Add'}}
        </button>
      </div>

    </form>
  `,
  styles: []
})
export class QuoteFormComponent implements OnInit {

  // TODO: Maybe this component should work as a standalone form, while the dialog part should be separated?

  initialQuote: Quote | null = this.data.quote

  quoteForm = this._fb.group({
    content: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
    author: ['', [Validators.minLength(3), Validators.maxLength(24)]],
  });

  get content() {
    return this.quoteForm.get('content')
  }

  get author() {
    return this.quoteForm.get('author')
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { quote: Quote | null },
    private _fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    // Update the form value for the edit scenario, if available.
    this.quoteForm.patchValue({
      content: this.initialQuote?.content,
      author: this.initialQuote?.author
    })
  }

}
