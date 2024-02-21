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
import {interval, map, Subscription} from "rxjs";

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
  startTime: number = 0;
  elapsedTime: number = 0;

  points: number = 0;

  ngOnInit() {
    this.resetTimer();
  }

  startTimer() {
    if (!this.isTimerRunning) {
      this.startTime = Date.now() - this.elapsedTime;
      this.timerSubscription = interval(1000)
        .pipe(
          map(() => {
            this.updateTimer();
          })
        )
        .subscribe();
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
    this.elapsedTime = 0;
    this.timer = '00:00:00';
  }

  updateTimer() {
    this.elapsedTime = Date.now() - this.startTime;
    const hours = Math.floor(this.elapsedTime / 3600000);
    const minutes = Math.floor((this.elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((this.elapsedTime % 60000) / 1000);
    this.timer = `${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;

    if (seconds === 0) {
      this.points += 1;
    }
  }

  formatTime(time: number): string {
    return time.toString().padStart(2, '0');
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

}
