import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: 'register',
    loadChildren: () => import('./views/register/register.module').then(m => m.RegisterModule),
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule),
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./views/quotes/quotes.module').then(m => m.QuotesModule),
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'discover',
    loadChildren: () => import('./views/discover/discover.module').then(m => m.DiscoverModule),
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'page-not-found',
    loadChildren: () => import('./views/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule),
    pathMatch: 'full'
  },
  {
    path: 'debug',
    loadChildren: () => import('./views/debug/debug.module').then(m => m.DebugModule),
    pathMatch: 'full'
  },
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
