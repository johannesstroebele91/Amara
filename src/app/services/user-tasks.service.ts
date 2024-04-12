import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from "./auth.service";
import {Task, UsersWithTasks} from "../shared/models";
import {Observable} from "rxjs";

interface ResponseData {
  [key: string]: UsersWithTasks;
}

const DOMAIN =
  'https://amara-9-default-rtdb.europe-west1.firebasedatabase.app/';
const USERS_WITH_TASKS_PATH = '/usersWithTasks';

@Injectable({
  providedIn: 'root', // This makes AuthService available throughout the application
})
export class UserTasksService {
  authService = inject(AuthService);
  http = inject(HttpClient);

  createUserWithDefaultTasks(id: string, name: string): Observable<{ name: string }> {
    const tasks: Task[] = [
      {name: 'Add your example task above', checked: false},
      {name: 'Click on the checkbox to mark a task as complete', checked: false},
    ];

    const usersWithTasks: UsersWithTasks = {
      id: id,
      name: name,
      tasks: tasks,
    }

    return this.http.put<{
      name: string;
    }>(`${DOMAIN}${USERS_WITH_TASKS_PATH}/${id}.json`, usersWithTasks);
  }

  /*fetchUsers(): Observable<ResponseData[]> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(() => {
        return this.http.get<ResponseData>(DOMAIN + USERS_WITH_TASKS_PATH + '.json')
      }),
      map((responseData: ResponseData) => {
        const users: ResponseData[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            const user = responseData[key];
            const workoutData = responseData[key].workoutData;
            users.push({
              ...user,
              id: key,
              workoutData: {
                goalPerWeek: workoutData.goalPerWeek,
                completedWorkouts: workoutData.completedWorkouts?.length === 0 ? [] : workoutData.completedWorkouts?.map((dateString) => {
                  return new Date(dateString)
                })
              }
            });
          }
        }
        return users;
      })
    )
  }

  fetchUser(id: string): Observable<ResponseData> {
    return this.http.get<ResponseData>(`${DOMAIN}${USERS_WITH_TASKS_PATH}/${id}.json`)
      .pipe(
        map((user: ResponseData) => {
          return {
            ...user,
            workoutData: {
              goalPerWeek: user.workoutData.goalPerWeek,
              completedWorkouts: user.workoutData.completedWorkouts?.length === 0 ? [] : user.workoutData.completedWorkouts?.map((dateString) => {
                return new Date(dateString)
              })
            }
          };
        })
      );
  }

  updateUserGoalPerWeek(userId: string, goalPerWeek: number): Observable<any> {
    const userData = {workoutData: {goalPerWeek}};
    return this.http.patch(`${DOMAIN}${USERS_WITH_TASKS_PATH}/${userId}.json`, userData);
  }

  addWorkout(user: ResponseData, newWorkout: Date): Observable<any> {
    const completedWorkouts = user.workoutData.completedWorkouts || [];
    const userData: ResponseData = {
      ...user,
      workoutData: {goalPerWeek: user.workoutData.goalPerWeek, completedWorkouts: [...completedWorkouts, newWorkout]}
    };
    return this.http.patch(`${DOMAIN}${USERS_WITH_TASKS_PATH}/${user.id}.json`, userData);
  }*/
}
