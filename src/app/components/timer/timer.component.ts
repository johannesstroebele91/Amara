import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
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
    <div style="width: 400px;">
      <mat-card style=" margin-bottom: 30px;">
        <mat-card-header style="margin: 0 auto">
          <mat-card-title style="font-size: 30px; margin-top: 20px;">Earned Points</mat-card-title>
        </mat-card-header>
        <ng-container>
          <p class="timer-style" style="color: #22b361">{{ pointsReached }}</p>
        </ng-container>
        <mat-card-footer>
          <p style="color: #5d5d5d; text-align: center; padding-bottom: 20px">Can be earned for each minute worked<br>and
            task completed.</p>
        </mat-card-footer>
      </mat-card>

      <mat-card style=" margin-bottom: 20px;">
        <mat-card-header style="margin: 0 auto">
          <mat-card-title style="font-size: 30px; margin-top: 30px;">Timer</mat-card-title>
        </mat-card-header>
        <mat-card-content style="text-align: center; ">
          <ng-container *ngIf="!isTimerRunning; else runningTimer">
            <p
              class="timer-style">{{ userTime }}</p>
          </ng-container>
          <ng-template #runningTimer>
            <p class="timer-style">{{ timer }}</p>
          </ng-template>
        </mat-card-content>
        <mat-card-footer style="margin: 10px auto 30px auto;">
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
      </mat-card>
    </div>`
})
export class TimerComponent implements OnDestroy, OnInit {
  timer: string = '00:00:00';
  isTimerRunning: boolean = false;
  timerSubscription: Subscription | undefined;
  startTime: dayjs.Dayjs | null = null;
  userTime: string = '00:00:00';
  @Input() pointsReached!: number;
  @Output() pointsReset = new EventEmitter<number>();
  @Output() pointsAddedByWorkedTime = new EventEmitter<number>();

  ngOnInit() {
    this.resetTimer();
  }

  startTimer() {
    if (!this.isTimerRunning) {
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
    this.pointsReached = 0;
    this.userTime = '00:00:00';
    this.pointsReset.emit(0);
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
        this.pointsAddedByWorkedTime.emit(1)
      }
    }
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
