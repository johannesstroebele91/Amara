import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {TimerComponent} from "./components/home/timer.component";
import {TaskComponent} from "./components/home/task.component";
import {LoginComponent} from "./components/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatToolbarModule, MatCheckbox, MatCardModule, MatButtonModule, TimerComponent, TaskComponent, LoginComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Amara';
}
