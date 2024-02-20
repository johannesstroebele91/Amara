import {Component} from "@angular/core";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatCheckbox} from "@angular/material/checkbox";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-task',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Tasks</mat-card-title>
      </mat-card-header>
      <mat-card-content *ngFor="let task of tasks">
        <mat-checkbox [ngModel]="task.checked" class="example-margin">{{ task.name }}</mat-checkbox>
      </mat-card-content>
    </mat-card>`,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCheckbox,
    NgForOf,
    FormsModule
  ],
  standalone: true
})
export class TaskComponent {
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

}
