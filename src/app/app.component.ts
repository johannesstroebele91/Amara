import {Component, OnDestroy, OnInit} from "@angular/core";
import {MatNativeDateModule} from "@angular/material/core";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCalendar} from "@angular/material/datepicker";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatNativeDateModule, RouterOutlet, MatButton, MatCalendar, MatIcon, MatMenuTrigger, MatIconButton, MatMenu, MatCard, MatCardTitle, MatCardHeader, MatCardContent, MatToolbar, RouterLink, NgIf],
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <span style="letter-spacing: 1px">{{ title }}</span>
        <mat-icon style="margin-left: 5px">alarm</mat-icon>
        <span style="flex: 1 1 auto;"></span>
        <a *ngIf="isNotOnLoginOrRegisterPage() && isAuthenticated" routerLink="/" (click)="logout()"
           style="color: white; text-decoration: none; font-size: 16px">Logout</a>
      </mat-toolbar-row>
    </mat-toolbar>
    <div style=" margin: 60px auto;">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  title = 'Amara';
  private userSub: Subscription | undefined;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.autoLoginAfterReload();

    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    })
  }

  isNotOnLoginOrRegisterPage(): boolean {
    const isOnLoginPage = this.router.url !== '/';
    const isOnRegisterPage = this.router.url !== '/register';
    return (isOnLoginPage && isOnRegisterPage);
  }

  logout() {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe()
  }
}
