import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
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
import {Task, UserWithTasks} from "../shared/models";
import {UsersTasksService} from "../services/users-tasks.service";
import {BehaviorSubject, Subscription} from "rxjs";


@Component({
  selector: 'app-task',
  template: `
    <mat-card style="max-width: 700px; min-width: 400px; min-height: 575px;">
      <mat-card-header style="margin: 0 auto 20px auto">
        <mat-card-title style="font-size: 30px; margin-top: 20px;">My Tasks</mat-card-title>
      </mat-card-header>

      <mat-card-content style="width: 100%">
        <form [formGroup]="taskForm">
          <div style="margin: 0 20px; display: inline-block;">
            <button (click)="addTask()" mat-mini-fab color="primary" aria-label="Add a task">
              <mat-icon>add</mat-icon>
            </button>
          </div>
          <mat-form-field style="width: 70%;">
            <input matInput formControlName="newTask" placeholder="Enter new task">
          </mat-form-field>
        </form>

        <mat-list *ngFor="let task of userWithTasks?.tasks">
          <div *ngIf="!task.editing" style="display: flex; align-items: center;">
            <mat-checkbox [ngModel]="task.checked" (change)="markTaskAsCompleted(task, $event)"
                          style="margin-left: 20px">
            </mat-checkbox>
            <mat-label style="margin-left: 20px; width: 60%">{{ task.name }}</mat-label>
            <button mat-icon-button (click)="editTask(task)" style="margin-left: 5px" aria-label="Edit task">
              <mat-icon>edit</mat-icon>
            </button>
          </div>

          <div *ngIf="task.editing">
            <div style="margin: 0 20px; display: inline-block;">
              <button (click)="saveTask(task)" mat-mini-fab color="primary" aria-label="save task">
                <mat-icon>save</mat-icon>
              </button>
            </div>
            <mat-form-field style="width: 70%">
              <input matInput [(ngModel)]="task.name" placeholder="Save task" (keyup.enter)="saveTask(task)"
              >
            </mat-form-field>
          </div>
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
export class TaskComponent implements OnInit, OnDestroy {
  @Input() userWithTasks!: UserWithTasks;
  @Output() pointsAddedByTaskCompletion = new EventEmitter<number>();
  taskForm = new FormGroup({
    newTask: new FormControl('')
  });

  private userWithTasksSubject: BehaviorSubject<UserWithTasks>;
  private userWithTasksSubscription: Subscription | undefined;

  constructor(private usersTasksService: UsersTasksService) {
    this.userWithTasksSubject = new BehaviorSubject<UserWithTasks>(this.userWithTasks);
  }

  ngOnInit() {
    this.userWithTasksSubject.next(this.userWithTasks); // Initialize with the input data

    // Subscribe to changes in userWithTasks
    this.userWithTasksSubscription = this.userWithTasksSubject.subscribe(userWithTasks => {
      if (userWithTasks) {
        this.userWithTasks = userWithTasks;
      }
    });
  }

  ngOnDestroy() {
    this.userWithTasksSubscription?.unsubscribe();
  }

  addTask() {
    const newTaskName = this.taskForm.value.newTask;
    if (newTaskName) {
      const newTask: Task = {name: newTaskName, checked: false, editing: false}
      if (this.userWithTasks?.tasks?.length > 0) {
        this.userWithTasks?.tasks?.unshift(newTask);
      } else {
        this.userWithTasks = {...this.userWithTasks, tasks: [newTask]}
      }
      this.updateUserWithTasks();
    }
    this.taskForm.reset();
  }

  markTaskAsCompleted(task: Task, event: MatCheckboxChange) {
    if (event.checked) {
      const index = this.userWithTasks.tasks.indexOf(task);
      if (index > -1) {
        this.userWithTasks.tasks.splice(index, 1);
        this.updateUserWithTasks();
        this.pointsAddedByTaskCompletion.emit(50)
      }
    }
  }

  editTask(task: Task) {
    task.editing = true;
    this.updateUserWithTasks();
  }

  saveTask(task: Task) {
    task.editing = false;
    this.updateUserWithTasks();
  }

  updateUserWithTasks() {
    this.userWithTasksSubject.next(this.userWithTasks); // Emit updated userWithTasks
    this.usersTasksService.updateUser(this.userWithTasks).subscribe({
      next: (response: any) => {
        console.log("User tasks updated successfully", response);
      },
      error: (error: any) => {
        console.error('Error updating user tasks:', error);
      }
    });
  }
}
