import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unauthenticated',
  standalone: true,
  imports: [ButtonComponent,CommonModule],
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
      <form autocomplete="off" class="form-container">
        <div class="form-sub-container">
          <div class="form-field">
            <label for="email">Email</label>
            <input type="text" id="email" name="email" placeholder="user@example.com">
          </div>
          <div class="form-field">
          <label for="password">Password</label>
          <input type="password" id="password" name="password">
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
  option : string = 'signup';

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
