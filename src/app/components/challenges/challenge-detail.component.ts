import {Component} from "@angular/core";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatCalendar} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-challenge-edit',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Krafttraining</mat-card-title>
        <mat-card-subtitle>2x pro Woche

        </mat-card-subtitle>
        <button mat-raised-button color="primary" (click)="onEdit()">Edit
          <mat-icon>edit</mat-icon>
        </button>

      </mat-card-header>
      <mat-card-content>
        <div>
          <p style="margin: 0; padding: 0;">Erreicht: 3 (75%)</p>
          <p style="margin: 0; padding: 0;">Verpasst: 1 (25%)</p>
          <p style="margin: 0; padding: 0;">Ziel: 4</p>
        </div>
        <mat-card class="demo-inline-calendar-card">
          <mat-calendar [(selected)]="selected"></mat-calendar>
        </mat-card>
      </mat-card-content>
    </mat-card>
  `,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCardContent,
    MatCard,
    MatCalendar,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatIcon,
    MatButton
  ],
  standalone: true
})
export class ChallengeDetailComponent {
  selected: Date | null | undefined;

  onEdit() {

  }
}


