import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {Field} from "../classes/field";
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  constructor(
    private rest: RestService
  ) { }

  public generate(source: string): Field {
    this.rest.call("POST", environment.backend_url + "/generate", {"size": 9})
      .subscribe(result => {
        console.debug(result)
      })
    return new Field(1)
  }
}
