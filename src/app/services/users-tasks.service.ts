import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from "./auth.service";
import {Task, UserWithTasks} from "../shared/models";
import {Observable} from "rxjs";

interface ResponseData {
  [key: string]: UserWithTasks;
}

const DOMAIN =
  'https://amara-9-default-rtdb.europe-west1.firebasedatabase.app/';
const USERS_WITH_TASKS_PATH = '/usersWithTasks';

@Injectable({
  providedIn: 'root', // This makes AuthService available throughout the application
})
export class UsersTasksService {
  authService = inject(AuthService);
  http = inject(HttpClient);

  createUserWithDefaultTasks(id: string, name: string): Observable<{ name: string }> {
    const tasks: Task[] = [
      {name: 'Add your example task above', checked: false},
      {name: 'Click on the checkbox to mark a task as complete', checked: false},
    ];

    const userWithTasks: UserWithTasks = {
      id: id,
      name: name,
      tasks: tasks,
    }

    return this.http.put<{
      name: string;
    }>(`${DOMAIN}${USERS_WITH_TASKS_PATH}/${id}.json`, userWithTasks);
  }

  getUser(id: string): Observable<ResponseData> {
    return this.http.get<ResponseData>(`${DOMAIN}${USERS_WITH_TASKS_PATH}/${id}.json`)
  }


  updateUser(userWithTasks: UserWithTasks): Observable<any> {
    return this.http.put(`${DOMAIN}${USERS_WITH_TASKS_PATH}/${userWithTasks.id}.json`, userWithTasks);
  }
}
