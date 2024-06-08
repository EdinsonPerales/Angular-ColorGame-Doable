import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `
    <button>
      <ng-content/>
    </button>
  `,
  styleUrl: './button.component.css'
})
export class ButtonComponent {

}
