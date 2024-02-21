import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {TimerComponent} from "./components/timer.component";
import {TaskComponent} from "./components/task.component";
import {LoginComponent} from "./components/login.component";
import {NgIf} from "@angular/common";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatToolbarModule, MatCheckbox, MatCardModule, MatButtonModule, TimerComponent, TaskComponent, LoginComponent, RouterLink, NgIf],
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <span>{{ title }}</span>
        <span style="flex: 1 1 auto;"></span>
        <a *ngIf="isNotHomeRoute()" routerLink="/" (click)="logout()"
           style="color: white; text-underline: none;">Logout</a>
      </mat-toolbar-row>
    </mat-toolbar>
    <div style="max-width: 600px; margin: 30px auto;">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  title = 'Amara';

  constructor(private router: Router, private authService: AuthService) {
  }

  isNotHomeRoute(): boolean {
    return this.router.url !== '/';
  }

  logout() {
    this.authService.logout()
  }
}
