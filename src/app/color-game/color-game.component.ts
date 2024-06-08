import { Component, OnInit, computed, signal } from '@angular/core';
import { getColorName, getRandomColors, getStatus, rgbString } from './utils';
import { Color } from './interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-color-game',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wrapper">
      <h1 class="title">Color Game</h1>
      <p class="description">
        Guess which color correspond to the following RGB code
      </p>

      <div class="rgb-wrapper">
      @for(primary of colors()[target()]; track $index){
          <div class="rgb"
               [ngClass]="'border-' + getColorName($index)">
            <p class="color-number">
              {{primary}}
            </p>
            <p class="color-name">
              {{getColorName($index)}}
            </p>
          </div>
        }
      </div>
      <div class="dashboard">
        <div class="number-input">
          <label for="colors"># Colors</label>
          <input
            id="colors"
            type="number"
            [value]="numOfColors()"
            (input)="handleChangeNumber($event)"
            step="3"
            min="3"
            max="9"
          />
        </div>
        <p class="game-status">{{ statusMessages[status()] }}</p>
        <button onClick="{handleReset}">Reset</button>
      </div>
      <div class="squares">
        @for (color of colors(); track $index) {
        <button
          [ngStyle]="{
            'background-color': rgbString(color),
            opacity: attempts().includes($index) ? '0' : '100'
          }"
          (click)="handleAttempt($index)"
          class="square"
        [disabled]="disabled"></button>
        }
      </div>
    </div>
  `,
  styleUrl: './color-game.component.css',
})
export class ColorGameComponent {
  rgbString      = rgbString;
  getColorName   = getColorName;
  statusMessages = {
    playing : 'The game is on!',
    win     : 'You won!',
    lose    : 'You lose!',
  };
  disabled    = false;
  numOfColors = signal(6);
  attempts    = signal<number[]>([]);
  colors      = computed(() => getRandomColors(this.numOfColors()));
  target      = computed(() =>  Math.floor(Math.random() * this.numOfColors()));
  status      = computed(() => getStatus(this.attempts(),this.target(),this.numOfColors()));

  handleChangeNumber(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let squaresAmount = inputElement.valueAsNumber;
    const allowedValues = [3,6,9];

    if(!allowedValues.includes(squaresAmount)){
      squaresAmount = this.numOfColors();
      inputElement.value = squaresAmount.toString();
      return;
    }

    if (squaresAmount === this.numOfColors()) return;

    inputElement.value = squaresAmount.toString();
    this.numOfColors.set(squaresAmount);
    this.attempts.set([]);
  }

  handleReset() {
    this.attempts.set([]);
    this.numOfColors.update((actual) => actual);
  }

  handleAttempt(index:number) {
    if(this.attempts().includes(index)) return;
    this.attempts.update( (array) => [...array,index] );
  }
}
