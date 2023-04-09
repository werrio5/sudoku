import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private jsonHeaders = new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});

  constructor(private httpClient: HttpClient) {
  }

  public call(reqType: string, url: string, params: any) {
    console.debug("call " + reqType + " " + url + " with params " + params);
    const options = {
      headers: this.jsonHeaders,
      body: params,
      withCredentials: false
    };
    return this.httpClient
      .request(reqType, url, options)
      .pipe(response => {
        return this.mapResponse(response);
      });
  }

  private mapResponse(response: any) {
    console.log(response);
    return response;
  }
}
