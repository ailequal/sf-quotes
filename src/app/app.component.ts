import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {snackBarConfiguration} from "./shared/configurations/snack-bar";
import {NavigationLink} from "./models/link";

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
                [value]="link.value"
                [routerLink]="link.routerLink"
                (click)="drawer.toggle()"
              >
                {{link.title}}
              </mat-list-option>
            </div>

            <div class="w-full">
              <mat-list-option
                class="my-4 text-center"
                [value]="'ailequal'"
                (click)="handleClickFavorite($event)">
                🍀 ailequal
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

  links: NavigationLink[] = [
    {
      title: '🏡 Home',
      value: 'home',
      routerLink: '/'
    },
    {
      title: '🌏 Discover',
      value: 'discover',
      routerLink: '/discover'
    }
  ];

  constructor(private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  handleClickFavorite($event: MouseEvent) {
    this._snackBar.open('Written with 💕 by ailequal.', '🍀', snackBarConfiguration)
  }

}
