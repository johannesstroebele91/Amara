import {Component} from "@angular/core";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatCheckbox} from "@angular/material/checkbox";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ChallengeComponent} from "./challenge.component";

@Component({
  selector: 'app-challenges',
  template: `
    <app-challenge></app-challenge>
    <app-challenge></app-challenge>
    <app-challenge></app-challenge>
  `,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCheckbox,
    NgForOf,
    FormsModule,
    ChallengeComponent
  ],
  standalone: true
})
export class ChallengesComponent {
  challenges = [
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
