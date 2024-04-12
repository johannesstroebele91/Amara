import {Component} from "@angular/core";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {TimerComponent} from "../timer/timer.component";

@Component({
  selector: 'app-challenge',
  styleUrl: 'challenge.component.scss',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Christi</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="row-btw-flex">
          <div>
            <p style="margin: 0; padding: 0;">Erreicht: 3 (75%)</p>
            <p style="margin: 0; padding: 0;">Verpasst: 1 (25%)</p>
            <p style="margin: 0; padding: 0;">Ziel: 4</p>
          </div>
          <button mat-raised-button color="primary" [routerLink]="['/challenge-edit']">Detailansicht</button>
        </div>
        <div class="row-btw-flex" style="border: #e6e6e6 2px solid;">
          <div>
            <p>Krafttraining</p>
            <p>2 pro Woche</p>
          </div>
          <div>
            <p>24.02.24</p>
            <mat-checkbox/>
          </div>
          <div>
            <p>25.02.24</p>
            <mat-checkbox/>
          </div>
          <div>
            <p>26.02.24</p>
            <mat-checkbox/>
          </div>
          <div>
            <p>27.02.24</p>
            <mat-checkbox/>
          </div>
          <div>
            <p>28.02.24</p>
            <mat-checkbox/>
          </div>
          <div>
            <p>01.03.24</p>
            <mat-checkbox/>
          </div>
          <div>
            <p>02.03.24</p>
            <mat-checkbox/>
          </div>
          <div>
            <p>03.03.24</p>
            <mat-checkbox/>
          </div>
        </div>
      </mat-card-content>
    </mat-card>


  `,
  imports: [
    TimerComponent,
    MatCheckbox,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    NgForOf,
    RouterLink
  ],
  standalone: true
})
export class ChallengeComponent {
}


