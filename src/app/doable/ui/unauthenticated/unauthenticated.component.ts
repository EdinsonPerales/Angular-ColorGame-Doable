import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-unauthenticated',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="auth-container">
      <div class="options-container">
        <app-button customClass="auth-buttons">Login</app-button>
        <app-button>Signup</app-button>
      </div>
      <div class="form-container">
        <form autocomplete="off">
          <div class="form-field">
            <label for="email">Email</label>
            <input type="text" id="email" name="email" placeholder="user@example.com">
          </div>
          <div class="form-field">
          <label for="password">Password</label>
          <input type="password" id="password" name="password">
          </div>
          <app-button>Login</app-button>
        </form>
      </div>
    </div>
  `,
  styleUrl: './unauthenticated.component.css'
})
export class UnauthenticatedComponent {

}
