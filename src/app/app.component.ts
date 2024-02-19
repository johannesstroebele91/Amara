import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatButtonModule, MatToolbarModule, MatCheckbox, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
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
  title = 'Amara';
}
