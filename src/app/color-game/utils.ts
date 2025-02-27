import { Color } from './interfaces';

export function getRandomColor(): Color {
  return [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
  ];
}

export function rgbString(color: Color) {
  const [r, g, b] = color;
  return `rgb(${r}, ${g}, ${b})`;
}

export function getRandomColors(n: number): Color[] {
  return [...Array(n)].map(() => getRandomColor());
}

export function getStatus(
  attempts: number[],
  target: number,
  numOfColors: number
): 'win' | 'lose' | 'playing' {
  if (attempts.length === numOfColors - 1) return 'lose';
  if (attempts.includes(target)) return 'win';
  return 'playing';
}

export function getColorName(n: number) : string{
  switch (n) {
    case 0:
      return 'red';
    case 1:
      return 'green';
    case 2:
      return 'blue';
    default:
      return 'error';
  }
}
