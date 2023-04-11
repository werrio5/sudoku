import {Injectable} from '@angular/core';
import {GameState} from "../classes/GameState";
import {Field} from "../classes/field";
import {GeneratorService} from "./generator.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private startDate!: number;
  private endDate!: number;
  private state: GameState = GameState.NOT_STARTED;
  private field!: Field | undefined;
  private errors: number[][] = [];

  constructor(
    private generator: GeneratorService
  ) {
  }

  public newGame(source: string) {
    if (this.state == GameState.IN_PROGRESS) {
      if (!window.confirm("Current game in progress. Start new?")) {
        return;
      }
    }
    this.endDate = 0;
    this.generator.generate(source)
      .subscribe(field => {
        this.field = field;
        this.state = GameState.IN_PROGRESS;
        this.startDate = Date.now();
        console.debug(field)
        console.debug("game started")
      });
  }

  public getField(): Field | undefined {
    return this.field;
  }

  public getStartDate(): number {
    return this.startDate;
  }

  public putDigit(value: number): void {
    if (this.field?.isSelectedDigitInitial()) {
      return;
    }
    this.field?.setCellValue(this.field?.getSelectedRow(), this.field?.getSelectedColumn(), value);
    this.errors = (this.field as Field).getErrors();
    if(this.isGameOver()) {
      this.endDate = Date.now();
      this.state = GameState.IS_OVER;
    }
  }

  private isGameOver(): boolean {
    return this.errors.length == 0 && this.field?.isFull() == true;
  }

  public getErrors(): number[][] {
    return this.errors;
  }

  public getState(): GameState {
    return this.state;
  }
}
