import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'sf-discover-header',
  template: `
    <div class="mb-6 text-center">
      <h2>Discover quotes</h2>

      <div class="lg:flex lg:justify-around lg:items-center">
        <button (click)="onClickRefresh.emit($event)" mat-raised-button color="accent">
          Don't you like what you see? Try again!
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class DiscoverHeaderComponent implements OnInit {

  @Output() onClickRefresh: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()

  constructor() {
  }

  ngOnInit(): void {
  }

}
