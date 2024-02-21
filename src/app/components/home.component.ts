import {Component} from "@angular/core";
import {TaskComponent} from "./task.component";
import {TimerComponent} from "./timer.component";

@Component({
  selector: 'app-home',
  template: `
    <app-timer></app-timer>
    <br>
    <app-task></app-task>
  `,
  imports: [
    TaskComponent,
    TimerComponent
  ],
  standalone: true
})
export class HomeComponent {

}
