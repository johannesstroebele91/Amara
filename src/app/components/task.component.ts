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
    <mat-card style="max-width: 700px; min-width: 600px; min-height: 575px;">
      <mat-card-header style="margin: 0 auto">
        <mat-card-title style="font-size: 30px; margin-top: 20px;">My Tasks</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <form [formGroup]="taskForm">
          <button (click)="addTask()" mat-mini-fab color="primary" aria-label="Add a task"
                  style="margin: 30px 10px 0 17px">
            <mat-icon>add</mat-icon>
          </button>
          <mat-form-field appearance="fill" style="width: 75%">
            <input matInput formControlName="newTask" placeholder="Enter new task">
          </mat-form-field>
        </form>

        <mat-list *ngFor="let task of userWithTasks?.tasks">
          <mat-list-item *ngIf="!task.editing">
            <mat-checkbox [ngModel]="task.checked" (change)="markTaskAsCompleted(task, $event)">
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
    console.log('addTask')
    console.log(this.taskForm.value)
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

  cancelEdit(task: Task) {
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
