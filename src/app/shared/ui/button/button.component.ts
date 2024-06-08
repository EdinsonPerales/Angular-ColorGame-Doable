import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [class]="customClass" [ngStyle]="customStyles" [disabled]="disabled">
      <ng-content/>
    </button>
  `,
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() customClass  : string             = '';
  @Input() customStyles : {[key:string]:any} = {};
  @Input() disabled     : boolean            = false;
}
