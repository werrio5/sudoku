import {Component} from '@angular/core';
import {GameService} from "../../../services/game.service";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  constructor(private game: GameService) {
  }

  public getGameTime(): number {
    return new Date().setMilliseconds(0);
    // return new Date().getTime() - this.game.getStartDate().getTime();
  }
}
