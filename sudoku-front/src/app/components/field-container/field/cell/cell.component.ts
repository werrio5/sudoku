import {Component, Input} from '@angular/core';
import {GameService} from "../../../../services/game.service";

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent {

  @Input() row!: number;
  @Input() col!: number;

  constructor(
    private game: GameService
  ) {
  }

  public getCellValue(): number | undefined {
    let value = this.game.getField()?.getCellValue(this.row, this.col);
    return value == 0 ? undefined : value;
  }

  public select(): void {
    this.game.getField()?.selectCell(this.row, this.col);
  }

  public isSelected(): boolean {
    return this.row == this.game.getField()?.getSelectedRow()
      && this.col == this.game.getField()?.getSelectedColumn();
  }

  public isSameArea(): boolean {
    return !this.isSelected()
      && (this.row == this.game.getField()?.getSelectedRow()
        || this.col == this.game.getField()?.getSelectedColumn()
        || this.isSameGroup()
      );
  }

  private isSameGroup(): boolean {
    let field = this.game.getField();
    if (!field) {
      return false;
    }
    return Math.floor(field.getSelectedRow() / field.getGroupSize()) == Math.floor(this.row / field.getGroupSize())
      && Math.floor(field.getSelectedColumn() / field.getGroupSize()) == Math.floor(this.col / field.getGroupSize());
  }

  public isUserInput(): boolean {
    return !this.game.getField()?.isDigitInitial(this.row, this.col);
  }

  public isError(): boolean {
    return this.game.getErrors()
      .find(record => record[0] == this.row && record[1] == this.col) != undefined;
  }

  public isSameDigitWithSelected(): boolean {
    return this.game.getField()?.isSameDigitAsSelected(this.row, this.col) == true;
  }
}
