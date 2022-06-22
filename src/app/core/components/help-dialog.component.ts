import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sf-help-dialog',
  template: `
    <h1 mat-dialog-title>Welcome</h1>

    <div mat-dialog-content class="max-w-sm">
      This is <b>sf-quotes</b>. Here you can save all your favorite quotes along with the corresponding author. There is
      a search filter, so you'll never feel lost. If you don't have any good ideas, check out the
      <a class="font-bold" routerLink="/discover" mat-dialog-close>discover</a> section!
    </div>

    <div mat-dialog-actions class="justify-end">
      <button mat-raised-button color="primary" mat-dialog-close cdkFocusInitial>Close</button>
    </div>
  `,
  styles: []
})
export class HelpDialogComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
