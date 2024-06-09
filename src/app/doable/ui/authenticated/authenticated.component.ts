import { Component, inject } from '@angular/core';
import { AuthStateService } from '../../data-access/state/auth-state.service';
import { TasksStateService } from '../../data-access/state/tasks-state.service';

@Component({
  selector: 'app-authenticated',
  standalone: true,
  imports: [],
  template: ` <button (click)="onLogout()">logout</button> `,
  styleUrl: './authenticated.component.css',
})
export class AuthenticatedComponent {
  authStateService  = inject(AuthStateService);
  tasksStateService = inject(TasksStateService);

  onLogout(){
    this.authStateService.logout$.next();
  }
}
