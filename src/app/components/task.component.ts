import {Component} from "@angular/core";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatCheckbox, MatCheckboxChange} from "@angular/material/checkbox";
import {NgForOf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import {MatDividerModule} from "@angular/material/divider";
import {MatLineModule} from "@angular/material/core";

interface Task {
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-task',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Tasks</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-list *ngFor="let task of tasks">
          <mat-list-item>
            <mat-checkbox [ngModel]="task.checked" (change)="toggleChecked(task, $event)">
              <mat-label>{{ task.name }}</mat-label>
            </mat-checkbox>
            <button mat-icon-button (click)="deleteTask(task)">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-list-item>
        </mat-list>

        <form [formGroup]="taskForm">
          <mat-form-field appearance="fill">
            <mat-label>New Task</mat-label>
            <input matInput formControlName="newTask" placeholder="Enter new task">
          </mat-form-field>
          <button mat-raised-button color="primary" (click)="addTask()">Add Task</button>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  imports: [
    MatFormFieldModule, MatInputModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCheckbox,
    NgForOf,
    MatLineModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatIcon,
    MatListItem,
    MatList,
    MatIconButton,
    MatDividerModule, FormsModule
  ],
  standalone: true
})
export class TaskComponent {
  tasks: Task[] = [
    {name: 'Setup project with Angular', checked: true},
    {name: 'Add Material UI and icons', checked: true},
    {name: 'Publish project on Github', checked: true},
    {name: 'Setup toolbar and title', checked: true},
    {name: 'Setup basic tasks and add description', checked: true},
    {name: 'Implement basic layout', checked: true},
    {name: 'Brainstorm next steps', checked: false},
    {name: 'Start using Angular typography', checked: false},
  ];

  taskForm = new FormGroup({
    newTask: new FormControl('', Validators.required)
  });

  addTask() {
    const newTaskName = this.taskForm.value.newTask;
    if (newTaskName) {
      this.tasks.push({name: newTaskName, checked: false});
      this.taskForm.reset(); // Clear the new task input after adding
    }
  }

  deleteTask(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }

  toggleChecked(task: Task, event: MatCheckboxChange) {
    task.checked = event.checked;
  }
}
