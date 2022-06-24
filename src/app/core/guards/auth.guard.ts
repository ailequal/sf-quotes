import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {map, Observable, of, take, tap} from 'rxjs';
import {AuthService} from "../../api/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this._authService.isGuest$.pipe(
      take(1),
      tap(isGuest => {
        if (!isGuest)
          return;

        alert('Access denied, you must login.');
        this._router.navigateByUrl('/login');
      }),
      map(isGuest => !isGuest) // The boolean must be inverted for the check.
    );
  }

}
