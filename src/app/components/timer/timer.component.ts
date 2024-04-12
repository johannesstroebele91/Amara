import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {interval, Subscription} from "rxjs";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {NgIf} from "@angular/common";

dayjs.extend(duration);

@Component({
  standalone: true,
  selector: 'app-timer',
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    NgIf
  ],
  styleUrl: 'timer.component.scss',
  template: `
    <mat-card style="max-width: 500px; margin-bottom: 30px; min-height: 330px;">
      <mat-card-header style="margin: 0 auto">
        <mat-card-title style="font-size: 40px; margin-top: 30px;">Timer</mat-card-title>
      </mat-card-header>
      <mat-card-content style="text-align: center; ">
        <ng-container *ngIf="!isTimerRunning; else runningTimer">
          <input [(ngModel)]="userTime"
                 class="timer-style"
                 placeholder="HH:mm:ss">
        </ng-container>
        <ng-template #runningTimer>
          <p class="timer-style">{{ timer }}</p>
        </ng-template>
        <ng-container>
          <p style="margin: 0; font-weight: 500; color: #2ecc71">EARNED POINTS: {{ points }}</p>
          <p style="color: #5d5d5d">Can be earned for each minute worked</p>
        </ng-container>
      </mat-card-content>
      <mat-card-footer style="margin: 30px auto;">
        <mat-card-actions>
          <button (click)="startTimer()" [disabled]="isTimerRunning" mat-raised-button color="primary"
                  style="margin-right: 12px">START
          </button>
          <button (click)="pauseTimer()" [disabled]="!isTimerRunning" mat-raised-button color="accent"
                  style="margin-right: 12px">PAUSE
          </button>
          <button (click)="resetTimer()" mat-raised-button color="warn">RESET</button>
        </mat-card-actions>
      </mat-card-footer>
    </mat-card>`
})
export class TimerComponent implements OnDestroy, OnInit {
  timer: string = '00:00:00';
  isTimerRunning: boolean = false;
  timerSubscription: Subscription | undefined;
  startTime: dayjs.Dayjs | null = null;
  points: number = 0;
  userTime: string = '00:00:00';

  ngOnInit() {
    this.resetTimer();
  }

  // Helper function to validate the time format
  isValidTimeFormat(time: string): boolean {
    const regex = /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/;
    return regex.test(time);
  }

  startTimer() {
    if (!this.isTimerRunning && this.isValidTimeFormat(this.userTime)) {
      this.isTimerRunning = true;
      const timeParts = this.userTime.split(':').map(part => parseInt(part, 10));
      const elapsedTime = dayjs.duration({
        hours: timeParts[0],
        minutes: timeParts[1],
        seconds: timeParts[2]
      });
      this.startTime = dayjs().subtract(elapsedTime);
      this.timerSubscription = interval(1000).subscribe(() => {
        this.updateTimer();
      });
    } else if (!this.isValidTimeFormat(this.userTime)) {
      // Handle invalid time format
      console.error('Invalid time format. Please enter time in HH:mm:ss format.');
      // Optionally, reset the userTime to a valid format
      this.userTime = '00:00:00';
      this.startTimer()
    }
  }

  pauseTimer() {
    if (this.isTimerRunning && this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.isTimerRunning = false;
      // Stellen Sie sicher, dass userTime im korrekten Format aktualisiert wird
      const durationObj = dayjs.duration(dayjs().diff(this.startTime));
      const hours = Math.floor(durationObj.asHours()).toString().padStart(2, '0');
      const minutes = durationObj.minutes().toString().padStart(2, '0');
      const seconds = durationObj.seconds().toString().padStart(2, '0');
      this.userTime = `${hours}:${minutes}:${seconds}`;
    }
  }

  resetTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.isTimerRunning = false;
    this.timer = '00:00:00';
    this.startTime = null;
    this.points = 0;
    this.userTime = '00:00:00';
  }

  updateTimer() {
    if (this.startTime) {
      const now = dayjs();
      const diff = now.diff(this.startTime);
      const durationObj = dayjs.duration(diff);
      const hours = Math.floor(durationObj.asHours()).toString().padStart(2, '0');
      const minutes = durationObj.minutes().toString().padStart(2, '0');
      const seconds = durationObj.seconds().toString().padStart(2, '0');
      this.timer = `${hours}:${minutes}:${seconds}`;

      if (durationObj.seconds() === 0 && durationObj.minutes() > 0) {
        this.points += 1;
      }
    }
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
