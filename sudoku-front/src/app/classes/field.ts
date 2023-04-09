import {Point} from "@angular/cdk/drag-drop";

export class Field {

  private readonly size: number;
  private readonly groupSize: number;
  private nums: number[][];
  private selectedRow: number = -1;
  private selectedColumn: number = -1;

  constructor(
    size: number,
  ) {
    this.size = size;
    this.groupSize = Math.round(Math.sqrt(size));
    this.nums = [];
    this.clear();
  }

  private clear(): void {
    this.nums = [];
    for (let i = 0; i < this.size; i++) {
      let row: number[] = [];
      for (let j = 0; j < this.size; j++) {
        row.push(0);
      }
      this.nums.push(row)
    }
  }

  public set(nums: number[][]): void {
    this.nums = nums;
  }

  public getCellValue(i: number, j: number): number {
    return this.nums[i][j];
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
}
