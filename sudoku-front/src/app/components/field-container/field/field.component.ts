import { Component } from '@angular/core';
import {GameService} from "../../../services/game.service";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent {

  constructor(private game: GameService) {
  }

  public getSize(): number[] {
    let size = this.game.getField()?.getSize();
    if (size) {
      return Array.from(Array(Math.sqrt(size)).keys())
    }
    return [];
  }
}
