import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../../data-access/state/auth-state.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthUser } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-unauthenticated',
  standalone: true,
  imports: [ButtonComponent,CommonModule, ReactiveFormsModule],
  template: `
    <div class="auth-container center">
      <div class="options-container">
        <app-button
        customClass="auth-buttons"
        [customStyles]="getLoginStyles()"
        (clicked)="handleOption('login')">Login</app-button>
        <app-button
        customClass="auth-buttons"
        [customStyles]="getSignupStyles()"
        (clicked)="handleOption('signup')">Signup</app-button>
      </div>
      <form (ngSubmit)="onSubmit()" [formGroup]="authForm" autocomplete="off" class="form-container">
        <div class="form-sub-container">
          <div class="form-field">
            <label for="email">Email</label>
            <input type="text"
            id="email"
            name="email"
            placeholder="user@example.com"
            formControlName="email">
          </div>
          <div class="form-field">
          <label for="password">Password</label>
          <input type="password"
          id="password"
          name="password"
          formControlName="password">
          </div>
          @if(option === 'login'){
            <app-button type="submit">Login</app-button>
          }@else {
            <app-button type="submit">Create</app-button>
          }
        </div>
      </form>

    </div>
  `,
  styleUrl: './unauthenticated.component.css'
})
export class UnauthenticatedComponent {
  option : string  = 'login';
  authStateService = inject(AuthStateService);
  #fb              = inject(FormBuilder);
  authForm         = this.#fb.nonNullable.group({
    email    : ['test567@mail.com',[Validators.required,Validators.email]],
    password : ['123456',[Validators.required]]
  })

  onSubmit(){
    if (!this.authForm.valid) {
      return;
    }
    const data = this.authForm.value as AuthUser;
    if (this.option === 'login') {
      this.authStateService.login$.next(data);
    }else if(this.option === 'signup'){
      this.authStateService.signup$.next(data);
    }
  }

  handleOption(value:string){
    this.option = value;
  }

  getLoginStyles() {
    return { 'font-weight': this.option === 'login' ? '600' : '400' };
  }

  getSignupStyles() {
    return { 'font-weight': this.option === 'signup' ? '600' : '400' };
  }
}
