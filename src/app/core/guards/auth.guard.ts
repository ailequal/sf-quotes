import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {map, Observable, take, tap} from 'rxjs';
import {AuthService} from "../../api/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // This guard has been deprecated, since we can rely on the stock ones from the package "@angular/fire".

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

        // TODO: It should not be triggered when a user logout,
        //  but with this implementation it will always start...
        // alert('Access denied, you must login.');

        this._router.navigateByUrl('/login');
      }),
      map(isGuest => !isGuest) // The boolean must be inverted for the check.
    );
  }

}
