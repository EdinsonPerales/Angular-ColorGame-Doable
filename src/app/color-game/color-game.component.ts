import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { getColorName, getRandomColors, getStatus, rgbString } from './utils';
import { Color } from './interfaces';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../shared/ui/button/button.component';

@Component({
  selector: 'app-color-game',
  standalone: true,
  imports: [CommonModule,ButtonComponent],
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
        <app-button (click)="handleReset()">Reset</app-button>
      </div>
      <div class="squares">
        @for (color of colors(); track $index) {
        <app-button
          [customStyles]="{
            'background-color': getBackgroundColor(color),
            opacity: getOpacity($index)
          }"
          (click)="handleAttempt($index)"
          class="square"
          [disabled]="disabled"></app-button>
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

  constructor(){
    effect(() =>{
      if (this.status() === 'win' || this.status() === "lose") {
        this.disabled = true;
      }
    })
  }

  getBackgroundColor(color : Color){
    const status = this.status();
    return (status === 'win' || status === 'lose')
           ?rgbString(this.colors()[this.target()])
           :rgbString(color);
  }

  getOpacity(index : number){
    const status = this.status();
    return (status === 'win' || status === 'lose')
           ?'100'
           :(this.attempts().includes(index) ? '0' : '100')
  }

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

    this.disabled = false;
    inputElement.value = squaresAmount.toString();
    this.numOfColors.set(squaresAmount);
    this.attempts.set([]);
  }

  handleReset() {
    this.attempts.set([]);
    const currentNumOfColors = this.numOfColors();
    this.numOfColors.set(0);
    this.numOfColors.set(currentNumOfColors);
    this.disabled = false;
  }

  handleAttempt(index:number) {
    if(this.attempts().includes(index)) return;
    this.attempts.update( (array) => [...array,index] );
  }
}
