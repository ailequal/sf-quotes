import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {snackBarConfiguration} from "./shared/configurations/snack-bar";
import {NavigationLink} from "./models/link";

@Component({
  selector: 'sf-root',
  template: `
    <mat-drawer-container class="h-screen" autosize>

      <mat-drawer #drawer class="w-[280px] p-8" mode="over">
        <sf-toolbar-list
          [links]="links"
          (onClickNavigation)="drawer.toggle()"
          (onClickAuthor)="handleClickAuthor($event)"
        ></sf-toolbar-list>
      </mat-drawer>

      <div>
        <sf-toolbar (onClickMenu)="drawer.toggle()" (onClickFavorite)="handleClickAuthor($event)"></sf-toolbar>

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

  handleClickAuthor($event: MouseEvent) {
    this._snackBar.open('Written with 💕 by ailequal.', '🍀', snackBarConfiguration)
  }

}
