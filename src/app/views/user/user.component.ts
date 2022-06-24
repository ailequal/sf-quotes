import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Guest, User} from "../../models/user";
import {AuthService} from "../../api/auth.service";

@Component({
  selector: 'sf-user',
  template: `
    <div sfContainerSmall>

      <div class="mb-6 text-center">
        <h2>User</h2>
      </div>

      <ng-container *ngIf="user$ | async as user; else loading">
        <div>
          <div class="mb-8">
            <h3 class="text-center">Welcome <b>{{user.displayName}}</b></h3>
            <img class="m-auto" [src]="user.photoURL" alt="Guest profile picture.">
          </div>

          <div class="lg:flex lg:justify-around lg:items-center">
            <button mat-raised-button color="accent" aria-label="The logout icon." (click)="auth.logout()">
              <mat-icon>logout</mat-icon>
              Logout
            </button>
          </div>
        </div>
      </ng-container>

      <ng-template #loading>
        <mat-progress-bar mode="query"></mat-progress-bar>
      </ng-template>
    </div>
  `,
  styles: []
})
export class UserComponent implements OnInit {

  // TODO: Access this route only when the user is logged in.

  // TODO: Add a simple interface for editing the user data (displayName, photoURL...).

  user$: Observable<User | Guest> | null = null;

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
    this.user$ = this.auth.user$;
  }

}