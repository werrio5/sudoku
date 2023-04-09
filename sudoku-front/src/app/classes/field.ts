export class Field {

  private size: number;
  private nums: number[][];

  constructor(
    size: number,
  ) {
    this.size = size;
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
}
