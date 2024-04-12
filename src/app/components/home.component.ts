import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle,} from '@angular/material/card';
import {MatCalendar} from '@angular/material/datepicker';
import {MatToolbar} from '@angular/material/toolbar';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButton} from "@angular/material/button";
import {MatProgressBar} from "@angular/material/progress-bar";
import {TimerComponent} from "./timer/timer.component";
import {TaskComponent} from "./task.component";
import {UserWithTasks} from "../shared/models";
import {UsersTasksService} from "../services/users-tasks.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCalendar,
    MatCardContent,
    MatToolbar,
    NgIf,
    RouterLink,
    NgForOf,
    MatProgressSpinner,
    MatButton,
    MatProgressBar,
    TimerComponent,
    TaskComponent,
  ],
  template: `
    <div
      style="display: flex; justify-content: space-around; flex-wrap: wrap">
      <app-timer></app-timer>
      <app-task [userWithTasks]="userWithTasks"></app-task>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  userWithTasks!: UserWithTasks;

  constructor(private route: ActivatedRoute, private usersTasksService: UsersTasksService) {
  }

  ngOnInit(): void {
    this.usersTasksService.getUser(this.route.snapshot.params['id']).subscribe({
      next: (response: any) => {
        this.userWithTasks = response;
        console.log("Getting the user was successful");
      },
      error: (error: any) => {
        console.error('Error on getting user:', error);
      }
    })
  }
}
