import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sf-page-not-found',
  template: `
    <div sfContainerSmall>

      <div class="mb-6">
        <h2 class="text-center">HTTP 404: Page not found</h2>

        <div class="lg:flex lg:justify-around lg:items-center">
          <button routerLink="/" mat-raised-button color="accent">
            🏡 Home
          </button>
        </div>

        <mat-card class="mt-8 mb-4">
          <mat-card-content class="text-lg">It works on my machine.</mat-card-content>

          <div class="flex justify-between items-center">
            <mat-card-subtitle style="margin: 0;" class="text-left text-xl">( Junior Developer )</mat-card-subtitle>
          </div>
        </mat-card>
      </div>

    </div>
  `,
  styles: []
})
export class PageNotFoundComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
