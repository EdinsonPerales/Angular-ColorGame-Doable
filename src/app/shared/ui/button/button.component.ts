import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [class]="customClass"
    [ngStyle]="customStyles"
    [disabled]="disabled"
    (click)="onClick()"
    [type]="type"]>
      <ng-content/>
    </button>
  `,
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() customClass  : string             = '';
  @Input() customStyles : {[key:string]:any} = {};
  @Input() disabled     : boolean            = false;
  @Input() type         : string             = 'button';
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
