import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {NavigationLink} from "./models/link";
import {MatDialog} from "@angular/material/dialog";
import {Quote} from "./models/quote";
import {HelpDialogComponent} from "./core/components/help-dialog.component";

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
        <sf-toolbar (onClickMenu)="drawer.toggle()" (onClickHelp)="handleClickHelp($event)"></sf-toolbar>

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

  constructor(
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  handleClickAuthor($event: MouseEvent) {
    this._snackBar.open('Written with 💕 by ailequal.', '🍀')
  }

  handleClickHelp($event: MouseEvent) {
    this._dialog.open<HelpDialogComponent, { quote: Quote | null }>(HelpDialogComponent);
  }

}
