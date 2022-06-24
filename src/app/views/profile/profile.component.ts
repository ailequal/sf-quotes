import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Guest, User} from "../../models/user";
import {AuthService} from "../../api/auth.service";

@Component({
  selector: 'sf-profile',
  template: `
    <div sfContainerSmall>

      <div class="mb-6 text-center">
        <h2>User</h2>
      </div>

      <ng-container *ngIf="user$ | async as user; else loading">
        <div>
          <div class="mb-8">
            <h3 class="text-center">Welcome <b>{{user.displayName}}</b></h3>
            <h4 class="text-center">Last login: {{user.data?.lastLogin | date: 'short'}}</h4>
            <img class="m-auto" [src]="user.photoURL" alt="Guest profile picture.">
          </div>

          <div class="lg:flex lg:justify-around lg:items-center">
            <button mat-raised-button color="accent" aria-label="The logout icon." (click)="authService.logout()">
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
export class ProfileComponent implements OnInit {

  // TODO: Add a simple interface for editing the profile data (displayName, photoURL...).

  user$: Observable<User | Guest> | null = null;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.user$ = this.authService.user$;
  }

}
