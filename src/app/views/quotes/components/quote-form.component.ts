import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'sf-quote-form',
  template: `
    <p>
      quote-form works!
    </p>
  `,
  styles: []
})
export class QuoteFormComponent implements OnInit {

  quoteForm = this._fb.group({
    content: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
    author: ['', [Validators.minLength(3), Validators.maxLength(24)]],
  });

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

}
