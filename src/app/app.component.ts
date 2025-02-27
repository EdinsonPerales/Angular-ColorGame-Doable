import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="wrapper">
      <header class="header">
        <a class="logo" href="/"
          ><img src="assets/angular.svg" />Angular Evaluation</a
        >
        <nav class="nav">
          @for (item of navigation; track item.to) {
          <a class="nav-item" [routerLink]="item.to" routerLinkActive="active">
            {{ item.name }}
          </a>
          }
        </nav>
      </header>
      <main class="main">
        <router-outlet />
      </main>
    </div>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  navigation = [
    {
      name: 'Color Game',
      to: '/color-game',
    },
    {
      name: 'Doable',
      to: '/doable',
    },
  ];
}
