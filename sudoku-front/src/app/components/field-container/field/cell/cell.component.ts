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
    console.debug("select")
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
}
