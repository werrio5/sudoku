import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-digit',
  templateUrl: './digit.component.html',
  styleUrls: ['./digit.component.css']
})
export class DigitComponent {

  @Input() value!: number | string
  @Input() func!: (value: number | string) => void;

  constructor() {
  }

  public onClick(): void {
    this.func(this.value);
  }
}
