import {Component} from "@angular/core";
import {FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  template: `
    <form (ngSubmit)="onSubmit(formValues)" #formValues="ngForm">
      <label for="email">Email</label>
      <input required ngModel email type="email" name="email" id="email">
      <button type="submit">Submit</button>
    </form>`,
  imports: [
    FormsModule
  ],
  standalone: true
})
export class LoginComponent {

  onSubmit(formValues: NgForm) {
    console.log(formValues)
  }
}
