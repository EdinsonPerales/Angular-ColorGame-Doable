import { Component, inject } from '@angular/core';
import { AuthenticatedComponent } from './ui/authenticated/authenticated.component';
import { UnauthenticatedComponent } from './ui/unauthenticated/unauthenticated.component';
import { CommonModule } from '@angular/common';
import { AuthStateService } from './data-access/state/auth-state.service';

@Component({
  selector: 'app-doable',
  standalone: true,
  imports: [AuthenticatedComponent, UnauthenticatedComponent,CommonModule],
  template: `
    <div class="wrapper">
      <h1 class="title">Doable</h1>
      <p class="description">Add and filter your most important tasks</p>
      @if (authStateService.token()) {
      <app-authenticated />
      } @else {
      <app-unauthenticated/>
      }
    </div>
  `,
  styleUrl: './doable.component.css',
})
export class DoableComponent {

  authStateService = inject(AuthStateService);
}
