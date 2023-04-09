import {Component} from '@angular/core';
import {GameService} from "../../services/game.service";
import {GameState} from "../../classes/GameState";

@Component({
  selector: 'app-field-container',
  templateUrl: './field-container.component.html',
  styleUrls: ['./field-container.component.css']
})
export class FieldContainerComponent {

  constructor(private game: GameService) {
  }

  public isGameInProgress(): boolean {
    return this.game.getState() == GameState.IN_PROGRESS;
  }
}
