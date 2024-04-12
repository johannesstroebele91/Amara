import {Component} from "@angular/core";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatCheckbox, MatCheckboxChange} from "@angular/material/checkbox";
import {NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import {MatDividerModule} from "@angular/material/divider";
import {MatLineModule} from "@angular/material/core";

interface Task {
  name: string;
  checked: boolean;
  editing?: boolean;
}

@Component({
  selector: 'app-task',
  styles: [`
    ::ng-deep .mat-mdc-text-field-wrapper {
      max-height: 40px;
    }

    ::ng-deep .mat-mdc-form-field {
      max-height: 80px;
    }

    ::ng-deep .mat-mdc-form-field-infix {
      padding: 10px 0 !important;
    }`],
  template: `
    <mat-card style="max-width: 700px; min-height: 460px;">
      <mat-card-header style="margin: 0 auto">
        <mat-card-title style="font-size: 40px; margin-top: 30px;">My Tasks</mat-card-title>
      </mat-card-header>

      <mat-card-content style="min-width: 500px;">
        <form [formGroup]="taskForm">
          <button (click)="addTask()" mat-mini-fab color="primary" aria-label="Add a task"
                  style="margin: 40px 10px 0 17px">
            <mat-icon>add</mat-icon>
          </button>
          <mat-form-field appearance="fill" style="width: 75%">
            <input matInput formControlName="newTask" placeholder="Enter new task">
          </mat-form-field>
        </form>

        <mat-list *ngFor="let task of tasks">
          <mat-list-item *ngIf="!task.editing">
            <mat-checkbox [ngModel]="task.checked" (change)="toggleChecked(task, $event)">
            </mat-checkbox>
            <mat-label style="margin-left: 8px">{{ task.name }}</mat-label>
            <button mat-icon-button (click)="editTask(task)">
              <mat-icon>edit</mat-icon>
            </button>

          </mat-list-item>

          <mat-list-item *ngIf="task.editing">
            <mat-form-field appearance="fill" style="width: 100%">
              <input matInput [(ngModel)]="task.name" placeholder="Edit task" (keyup.enter)="saveTask(task)"
              >
            </mat-form-field>
            <button mat-icon-button color="primary" (click)="saveTask(task)">
              <mat-icon>save</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="cancelEdit(task)">
              <mat-icon>cancel</mat-icon>
            </button>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>
  `,
  imports: [
    MatFormFieldModule,
    MatInputModule,
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
    MatDividerModule,
    FormsModule,
    MatMiniFabButton,
    NgIf
  ],
  standalone: true
})
export class TaskComponent {
  tasks: Task[] = [
    {name: 'Add your example task above', checked: false},
    {name: 'Click on the checkbox when you finished the task', checked: false},
  ];

  taskForm = new FormGroup({
    newTask: new FormControl('')
  });

  addTask() {
    const newTaskName = this.taskForm.value.newTask;
    if (newTaskName) {
      this.tasks.unshift({name: newTaskName, checked: false, editing: false}); // Use unshift to add at the beginning
      this.taskForm.reset();
    }
  }

  toggleChecked(task: Task, event: MatCheckboxChange) {
    if (event.checked) {
      const index = this.tasks.indexOf(task);
      if (index > -1) {
        this.tasks.splice(index, 1);
      }
    }
  }

  editTask(task: Task) {
    task.editing = true;
  }

  saveTask(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks[index].name = task.name;
    }
    task.editing = false;
  }

  cancelEdit(task: Task) {
    task.editing = false;
  }
}
