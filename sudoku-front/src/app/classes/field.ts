import {Point} from "@angular/cdk/drag-drop";

export class Field {

  private readonly size: number;
  private readonly groupSize: number;
  //deep copy for preventing source digits removal
  private _nums: number[][];
  private nums: number[][];
  private selectedRow: number = -1;
  private selectedColumn: number = -1;

  constructor(
    size: number,
  ) {
    this.size = size;
    this.groupSize = Math.round(Math.sqrt(size));
    this.nums = this.init();
    this._nums = this.init();
  }

  private init(): number[][] {
    let nums = [];
    for (let i = 0; i < this.size; i++) {
      let row: number[] = [];
      for (let j = 0; j < this.size; j++) {
        row.push(0);
      }
      nums.push(row)
    }
    return nums;
  }

  public set(nums: number[][]): void {
    this.nums = nums;
    this.fillCopy();
  }

  private fillCopy(): void {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        this._nums[row][col] = this.nums[row][col];
      }
    }
  }

  public getCellValue(row: number, col: number): number {
    return this.nums[row][col];
  }

  public setCellValue(row: number, col: number, value: number): void {
    this.nums[row][col] = value;
  }

  public getSize(): number {
    return this.size;
  }

  public getGroupSize(): number {
    return this.groupSize;
  }

  public selectCell(row: number, column: number): void {
    this.selectedRow = row;
    this.selectedColumn = column
  }

  public getSelectedRow(): number {
    return this.selectedRow;
  }

  public getSelectedColumn(): number {
    return this.selectedColumn;
  }

  public isSelectedDigitInitial(): boolean {
    return this.isDigitInitial(this.selectedRow, this.selectedColumn);
  }

  public isDigitInitial(row: number, col: number) {
    return this._nums[row][col] > 0;
  }
}
