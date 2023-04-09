import {Component, Input} from '@angular/core';
import {GameService} from "../../../../services/game.service";

@Component({
  selector: 'app-cell-group',
  templateUrl: './cell-group.component.html',
  styleUrls: ['./cell-group.component.css']
})
export class CellGroupComponent {

  @Input() row!: number;
  @Input() col!: number;

  constructor(
    private game: GameService
  ) {
  }

  public getGroupRowOffset(): number{
    let groupSize = this.game.getField()?.getGroupSize();
    return groupSize == undefined ? 0 : groupSize * this.row;
  }

  public getGroupColOffset(): number {
    let groupSize = this.game.getField()?.getGroupSize();
    return groupSize == undefined ? 0 : groupSize * this.col;
  }
}
