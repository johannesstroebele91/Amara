import {FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Component} from "@angular/core";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    MatFormField,
    MatInput,
    MatIconButton,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ], template: `
    <form (ngSubmit)="onSubmit(formValues)" #formValues="ngForm">

      <mat-form-field style="display: block">
        <mat-label>Enter your email</mat-label>
        <input matInput placeholder="pat@example.com" required ngModel name="email" email #email="ngModel">
        <mat-error *ngIf="email.invalid">{{ getErrorMessage() }}</mat-error>
      </mat-form-field>

      <mat-form-field style="display: block">
        <mat-label>Enter your password</mat-label>
        <input matInput [type]="hide ? 'password' : 'text'" required ngModel name="password" #password="ngModel">
        <button mat-icon-button matSuffix (click)="hide = !hide" [attr.aria-label]="'Hide password'"
                [attr.aria-pressed]="hide">
          <mat-icon>{{ hide ? 'visibility_off' : 'visibility' }}</mat-icon>
        </button>
        <mat-error *ngIf="password.invalid">{{ getErrorMessage() }}</mat-error>
      </mat-form-field>

      <button type="submit" mat-raised-button color="primary" style="display: block">Login</button>
    </form>
  `,
  standalone: true
})
export class LoginComponent {

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  constructor(private router: Router, private authService: AuthService) {
  }

  onSubmit(formValues: NgForm) {
    this.authService.login(formValues.form.value.email, formValues.form.value.password).then(response => {
      if (response && formValues.form.status === 'VALID') {
        this.router.navigate(['/home']).then(r => console.log('User logged in'))
      }
    })
  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') && 'Not a valid email';
  }

}
