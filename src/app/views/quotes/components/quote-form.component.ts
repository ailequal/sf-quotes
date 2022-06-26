import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Quote} from "../../../models/quote";

@Component({
  selector: 'sf-quote-form',
  template: `
    <form [formGroup]="quoteForm" novalidate>

      <h1>New quote</h1>

      <div>
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
          <mat-icon matSuffix>face</mat-icon>
        </mat-form-field>
      </div>

      <div class="text-right">
        <button
          mat-button
          (click)="onClickCancel.emit(false)"
        >
          Cancel
        </button>

        <button
          mat-raised-button
          color="primary"
          (click)="handleSubmit($event)"
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

  @Input() initialQuote: Quote | null = null;

  @Output() onClickCancel: EventEmitter<false> = new EventEmitter<false>();

  @Output() onClickAddEdit: EventEmitter<Omit<Quote, 'uid' | 'userUid' | 'timestamp'>> = new EventEmitter<Omit<Quote, 'uid' | 'userUid' | 'timestamp'>>();

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

  handleSubmit($event: MouseEvent) {
    let quote: Omit<Quote, 'uid' | 'userUid' | 'timestamp'> = {content: this.content!.value, author: this.author!.value}

    // If we don't have an author set, we will always set "Anonymous".
    if (!quote.author)
      quote = {...quote, author: 'Anonymous'};

    this.onClickAddEdit.emit(quote)
  }

}
