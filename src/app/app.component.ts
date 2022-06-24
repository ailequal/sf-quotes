import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {NavigationLink} from "./models/link";
import {MatDialog} from "@angular/material/dialog";
import {Quote} from "./models/quote";
import {HelpDialogComponent} from "./core/components/help-dialog.component";
import {AuthService} from "./api/auth.service";
import {MatDrawer} from "@angular/material/sidenav";
import {Observable} from "rxjs";

@Component({
  selector: 'sf-root',
  template: `
    <mat-drawer-container class="h-screen" autosize>

      <mat-drawer #drawerRef class="w-[280px] p-8" mode="over">
        <sf-toolbar-list
          [links]="links"
          [isGuest]="isGuest$ | async"
          (onClickNavigation)="drawerRef.toggle()"
          (onClickAuthor)="handleClickAuthor($event)"
          (onClickLogout)="handleClickLogout($event)"
        ></sf-toolbar-list>
      </mat-drawer>

      <div>
        <sf-toolbar (onClickMenu)="drawerRef.toggle()" (onClickHelp)="handleClickHelp($event)"></sf-toolbar>

        <div class="my-8" sfContainer>
          <router-outlet></router-outlet>
        </div>
      </div>

    </mat-drawer-container>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  @ViewChild('drawerRef', {read: MatDrawer, static: true}) drawer!: MatDrawer;

  links: NavigationLink[] = [
    {
      title: 'Home',
      icon: '🏡',
      value: 'home',
      routerLink: '/'
    },
    {
      title: 'Discover',
      icon: '🌏',
      value: 'discover',
      routerLink: '/discover'
    }
  ];

  isGuest$: Observable<boolean> | null = null;

  constructor(
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog,
    private _auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.isGuest$ = this._auth.isGuest$;
  }

  handleClickAuthor($event: MouseEvent) {
    this._snackBar.open('Written with 💕 by ailequal.', '🍀');
    this.drawer.toggle();
  }

  handleClickLogout($event: MouseEvent) {
    this._auth.logout();
    this.drawer.toggle();
  }

  handleClickHelp($event: MouseEvent) {
    this._dialog.open<HelpDialogComponent, { quote: Quote | null }>(HelpDialogComponent);
  }

}
