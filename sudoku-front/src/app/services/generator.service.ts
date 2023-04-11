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

  private params = {"size": 9};

  constructor(
    private rest: RestService
  ) { }

  public generate(source: string): Observable<Field> {
    return this.rest.call("POST", environment.backend_url + "/" + source, this.params)
      .pipe(map(result => {
        let field = new Field(this.params["size"]);
        field.set(result.grid);
        return field;
      }));
  }

  public getParams(): any {
    return this.params;
  }
}
