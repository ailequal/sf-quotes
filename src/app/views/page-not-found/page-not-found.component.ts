import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sf-page-not-found',
  template: `
    <div sfContainerSmall>

      <div class="mb-6 text-center">
        <h2>HTTP 404: Page not found</h2>

        <div class="lg:flex lg:justify-around lg:items-center">
          <button routerLink="/" mat-raised-button color="accent">
            🏡 Home
          </button>
        </div>
      </div>

    </div>
  `,
  styles: []
})
export class PageNotFoundComponent implements OnInit {

  // TODO: Add a static quote as a joke related to the 404.

  constructor() {
  }

  ngOnInit(): void {
  }

}
