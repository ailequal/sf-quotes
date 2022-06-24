import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Guest, User} from "../../models/user";
import {AuthService} from "../../api/auth.service";

@Component({
  selector: 'sf-login',
  template: `
    <div sfContainerSmall>

      <div class="mb-6 text-center">
        <h2>Login</h2>
      </div>

      <ng-container *ngIf="user$ | async as user; else loading">
        <div>
          <div class="mb-8">
            <h3 class="text-center">Welcome <b>{{user.displayName}}</b></h3>
            <img class="m-auto" [src]="user.photoURL" alt="Guest profile picture.">
          </div>

          <div class="lg:flex lg:justify-around lg:items-center">
            <button mat-raised-button color="accent" aria-label="The Google login icon."
                    (click)="authService.googleLogin()">
              <mat-icon>login</mat-icon>
              Login with Google
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
export class LoginComponent implements OnInit {

  // TODO: Access this route only when the user is not logged in.

  user$: Observable<User | Guest> | null = null;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.user$ = this.authService.user$;
  }

}
