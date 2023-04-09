import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {Field} from "../classes/field";
import {environment} from 'src/environments/environment';
import {Observable, of, Subscription} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  constructor(
    private rest: RestService
  ) { }

  public generate(source: string): Observable<Field> {
    return this.rest.call("POST", environment.backend_url + "/" + source, {"size": 9})
      .pipe(map(result => {
        let field = new Field(9);
        field.set(result.grid);
        return field;
      }));
  }
}
