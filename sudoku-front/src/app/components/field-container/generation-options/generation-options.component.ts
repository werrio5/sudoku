import { Component } from '@angular/core';
import {GameService} from "../../../services/game.service";
import {GeneratorService} from "../../../services/generator.service";

@Component({
  selector: 'app-generation-options',
  templateUrl: './generation-options.component.html',
  styleUrls: ['./generation-options.component.css']
})
export class GenerationOptionsComponent {

  constructor(private generator: GeneratorService) {
  }

  public setSize(size: number): void {
    this.generator.getParams()["size"] = size;
  }
}
