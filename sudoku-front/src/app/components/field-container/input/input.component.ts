import {Component} from '@angular/core';
import {GameService} from "../../../services/game.service";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  private timer: number = 0;
  digitInput: (value: number | string) => void = (value) => {
    this.game.putDigit(value as number)
  };
  undo: (value: number | string) => void = () => {
    console.debug('undo');
  };
  //todo: not available... for now?
  hint: (value: number | string) => void = () => {
    console.debug('hint');
  };
  //todo: forbid removal of initial digit set
  remove: (value: number | string) => void = () => {
    this.game.putDigit(0)
  };

  constructor(private game: GameService) {
    setInterval(() => {
      let startTime = this.game.getStartDate();
      if (startTime) {
        this.timer = Date.now() - startTime;
      }
    }, 1000);
  }

  public getGameTime(): string {
    return this.parseTimer();
  }

  private parseTimer(): string {
    let date = new Date(this.timer);
    return [
      this.formatNumber(date.getUTCHours()),
      this.formatNumber(date.getUTCMinutes()),
      this.formatNumber(date.getUTCSeconds())
    ].join(":");
  }

  private formatNumber(value: number): string {
    return value < 10 ? "0" + value : value.toString();
  }
}
