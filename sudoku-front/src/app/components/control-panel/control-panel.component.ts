import {Component} from '@angular/core';
import {RestService} from "../../services/rest.service";
import {GeneratorService} from "../../services/generator.service";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent {

  constructor(private generator: GeneratorService) {
  }

  public generate(source: string) : void {
    this.generator.generate("generator")
  }
}
