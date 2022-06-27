import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/compat/auth-guard";

// @link https://github.com/angular/angularfire/blob/master/docs/auth/router-guards.md
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule),
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: () => redirectLoggedInTo('/')
    },
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./views/quotes/quotes.module').then(m => m.QuotesModule),
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo('/login')
    },
    pathMatch: 'full'
  },
  {
    path: 'discover',
    loadChildren: () => import('./views/discover/discover.module').then(m => m.DiscoverModule),
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo('/login')
    },
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo('/login')
    },
    pathMatch: 'full'
  },
  {
    path: 'page-not-found',
    loadChildren: () => import('./views/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule),
    pathMatch: 'full'
  },
  // {
  //   path: 'debug',
  //   loadChildren: () => import('./views/debug/debug.module').then(m => m.DebugModule),
  //   pathMatch: 'full'
  // },
  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
