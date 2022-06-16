import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'sf-toolbar',
  template: `
    <mat-toolbar color="primary">
      <div class="flex items-center" sfContainer>

        <button (click)="handleClickMenu($event)" mat-icon-button aria-label="The menu icon.">
          <mat-icon>menu</mat-icon>
        </button>

        <span>sf-quotes</span>

        <span class="flex-auto"></span>

        <button (click)="handleClickFavorite($event)" mat-icon-button aria-label="The favorite icon.">
          <mat-icon>favorite</mat-icon>
        </button>

      </div>
    </mat-toolbar>
  `,
  styles: []
})
export class ToolbarComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  handleClickMenu($event: MouseEvent) {
    // TODO: Implement a simple menu with the material Sidenav component.
    //  I still don't know what I will show inside...
    console.log($event)
  }

  handleClickFavorite($event: MouseEvent) {
    console.log($event)

    this._snackBar.open('Written with 💕 by ailequal.', '🍀', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000
    })
  }

}
