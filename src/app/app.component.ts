import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'sf-root',
  template: `
    <mat-drawer-container class="h-screen" autosize>

      <mat-drawer #drawer class="w-[280px] p-8" mode="over">
        <mat-selection-list #shoes [multiple]="false" class="h-full">
          <div class="flex flex-col justify-between items-center h-full">

            <div class="w-full">
              <mat-list-option
                class="my-4 text-center"
                *ngFor="let link of links"
                [value]="link"
                routerLink="/"
                (click)="drawer.toggle()"
              >
                {{link}}
              </mat-list-option>
            </div>

            <div class="w-full">
              <mat-list-option
                class="my-4 text-center"
                [value]="'link'"
                routerLink="/"
                (click)="drawer.toggle()">
                🔗 link
              </mat-list-option>
            </div>

          </div>
        </mat-selection-list>
      </mat-drawer>

      <div>
        <sf-toolbar (onClickMenu)="drawer.toggle()" (onClickFavorite)="handleClickFavorite($event)"></sf-toolbar>

        <div class="my-8" sfContainer>
          <router-outlet></router-outlet>
        </div>
      </div>

    </mat-drawer-container>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  // TODO: Complete the menu with the correct links, depending on the SPA structure and functionality.

  links: string[] = ['🏡 Home', '🌏 Discover', '➡️ Login', '📝 Register'];

  constructor(private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  handleClickFavorite($event: MouseEvent) {
    this._snackBar.open('Written with 💕 by ailequal.', '🍀', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000
    })
  }

}
