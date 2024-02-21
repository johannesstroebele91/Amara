import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home.component";
import {LoginComponent} from "./components/login.component";
import {isUserLoggedInGuard} from "./services/auth-guard.service";

export const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [isUserLoggedInGuard]},
  {path: '**', redirectTo: '/home'}
];
