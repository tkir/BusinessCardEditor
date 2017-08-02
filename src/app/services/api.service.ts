import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {AppConfigService} from "./app-config.service";

@Injectable()
export class ApiService {

  constructor(private http: Http,
              private config: AppConfigService) {
    this.api_url = this.config.get('api.endpoint');
  }

  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });

  api_url: string;

  private getJSON(resp: Response): string {
    return resp.json();
  }

  private checkForError(resp: Response): Response {
    if (resp.status >= 200 && resp.status < 300)return resp;
    else {
      const err = new Error(resp.statusText);
      err['response'] = resp;
      console.error(err);
      throw err;
    }
  }

  get(path: string): Observable<any> {
    return this.http.get(`${this.api_url}${path}.json`, {headers: this.headers})
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJSON);
  }

  post(path: string, body: any): Observable<any> {
    return this.http.post(`${this.api_url}${path}.json`,
      JSON.stringify(body),
      {headers: this.headers})
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJSON);
  }

  delete(path: string): Observable<any> {
    return this.http.get(`${this.api_url}${path}/.json`, {headers: this.headers})
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJSON);
  }

  put(path: string, body: any): Observable<any> {
    return this.http.put(`${this.api_url}${path}/.json`,
      JSON.stringify(body),
      {headers: this.headers})
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJSON);
  }

  setHeaders(headers: any) {
    Object.keys(headers)
      .forEach(header => this.headers.set(header, headers[header]));
  }
}
