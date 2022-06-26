import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {NavigationLink} from "./models/link";
import {MatDialog} from "@angular/material/dialog";
import {HelpDialogComponent} from "./core/components/help-dialog.component";
import {AuthService} from "./api/auth.service";
import {MatDrawer} from "@angular/material/sidenav";
import {Observable} from "rxjs";
import {CopyrightComponent} from "./core/components/copyright.component";

@Component({
  selector: 'sf-root',
  template: `
    <mat-drawer-container class="flex flex-col h-full justify-between" autosize>

      <mat-drawer #drawerRef class="w-[280px] p-8" mode="over">
        <sf-toolbar-list
          [links]="links"
          [isGuest]="isGuest$ | async"
          (onClickNavigation)="drawerRef.toggle()"
          (onClickCopyright)="handleClickCopyright($event)"
          (onClickProfile)="drawerRef.toggle()"
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
      icon: 'home',
      value: 'home',
      routerLink: '/'
    },
    {
      title: 'Discover',
      icon: 'travel_explore',
      value: 'discover',
      routerLink: '/discover'
    }
  ];

  isGuest$: Observable<boolean> | null = null;

  constructor(
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog,
    private _authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.isGuest$ = this._authService.isGuest$;
  }

  handleClickCopyright($event: MouseEvent) {
    this._snackBar.openFromComponent(CopyrightComponent);
    this.drawer.toggle();
  }

  handleClickLogout($event: MouseEvent) {
    this._authService.logout();
    this.drawer.toggle();
  }

  handleClickHelp($event: MouseEvent) {
    this._dialog.open<HelpDialogComponent>(HelpDialogComponent, {
      maxWidth: '200px',
      maxHeight: '200px',
      width: '50%',
      height: '50%'
    });
  }

}
