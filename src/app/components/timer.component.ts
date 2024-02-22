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
import 'dayjs/plugin/duration';
import 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

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
    MatCardTitle
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Timer</mat-card-title>
        <mat-card-subtitle style="font-size: 90px; margin: 60px 0;">{{ timer }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p style="margin: 0; font-weight: 500; color: #2ecc71">EARNED
          POINTS: {{ points }}</p>
        <p style="color: #5d5d5d">Can be earned for each minute worked</p>
      </mat-card-content>
      <mat-card-footer>
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

  ngOnInit() {
    this.resetTimer();
  }

  startTimer() {
    if (!this.isTimerRunning) {
      this.startTime = this.startTime ? this.startTime : dayjs();
      this.timerSubscription = interval(1000)
        .subscribe(() => {
          this.updateTimer();
        });
      this.isTimerRunning = true;
    }
  }

  pauseTimer() {
    if (this.isTimerRunning && this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.isTimerRunning = false;
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
  }

  updateTimer() {
    if (this.startTime) {
      const now = dayjs();
      const duration = dayjs.duration(now.diff(this.startTime));
      this.timer = duration.format('HH:mm:ss');

      if (duration.seconds() === 0 && duration.minutes() > 0) {
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
