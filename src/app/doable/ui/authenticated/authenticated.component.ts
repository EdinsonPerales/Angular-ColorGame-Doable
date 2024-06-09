import { Component, inject } from '@angular/core';
import { AuthStateService } from '../../data-access/state/auth-state.service';

@Component({
  selector: 'app-authenticated',
  standalone: true,
  imports: [],
  template: ` <button (click)="onLogout()">logout</button> `,
  styleUrl: './authenticated.component.css',
})
export class AuthenticatedComponent {
  authStateService = inject(AuthStateService);

  onLogout(){
    this.authStateService.logout$.next();
  }
}
