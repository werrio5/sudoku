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

  public getErrors(): number[][] {
    let errors = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.nums[i][j] > 0 && !this.validate(i, j) && !this.isDigitInitial(i, j)) {
          errors.push([i, j]);
        }
      }
    }
    return errors;
  }

  private validate(row: number, col: number) : boolean {
    let value = this.nums[row][col];
    let sameAreaDigits = new Set();
    // row duplicates
    for (let i = 0; i < this.size; i++) {
      if (i == col) {
        continue;
      }
      sameAreaDigits.add(this.nums[row][i]);
    }
    if (sameAreaDigits.has(value)) {
      return false;
    }
    // column duplicates
    for (let i = 0; i < this.size; i++) {
      if (i == row) {
        continue;
      }
      sameAreaDigits.add(this.nums[i][col]);
    }
    if (sameAreaDigits.has(value)) {
      return false;
    }
    // same square digits
    let squareRowOffset = Math.floor(row / this.groupSize) * this.groupSize;
    let squareColOffset = Math.floor(col / this.groupSize) * this.groupSize;
    for (let i = squareRowOffset; i < squareRowOffset + this.groupSize; i++) {
      for (let j = squareColOffset; j < squareColOffset + this.groupSize; j++) {
        if (i == row && j == col) {
          continue;
        }
        sameAreaDigits.add(this.nums[i][j]);
      }
    }
    return !sameAreaDigits.has(value);
  }

  public isSameDigitAsSelected(row: number, col: number): boolean {
    if (!(this.selectedRow >= 0)) {
      return false;
    }
    return this.nums[row][col] > 0
      && this.nums[row][col] == this.nums[this.selectedRow][this.selectedColumn]
      && (row != this.selectedRow || col != this.selectedColumn);
  }

  public isFull(): boolean {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (!(this.nums[i][j] > 0)) {
          return false;
        }
      }
    }
    return true;
  }
}
