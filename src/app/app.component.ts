import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {interval, map, Subscription} from "rxjs";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatToolbarModule, MatCheckbox, FormsModule, CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  tasks = [
    {name: 'Setup project with angular', checked: true},
    {name: 'Add material ui and icons', checked: true},
    {name: 'Publish project on github', checked: true},
    {name: 'Setup toolbar and title', checked: true},
    {name: 'Setup basic tasks and add description', checked: true},
    {name: 'Implement basic layout', checked: true},
    {name: 'Brainstorm next steps', checked: false},
    {name: 'Start using Angular typography', checked: false},
  ]
  title = 'Amara';

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
