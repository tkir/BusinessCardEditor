import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {PlatformLocation} from "@angular/common";

@Injectable()
export class AppConfigService {

  private config: Object = null;
  private env: Object = null;
  //TODO перед production убрать '../..'
  private configPath: string = `${this.location.getBaseHrefFromDOM()}assets/config.`;
  public imagePath: string = `${this.location.getBaseHrefFromDOM()}assets/img`;
  private headers: Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });

  constructor(private http: Http,
              private location: PlatformLocation,) {
  }

  public post(key, value): boolean {
    let res: any = this.config;
    key.split('.')
      .forEach(k => res = res[k]);

    if (!Array.isArray(res) || res.indexOf(value) != -1)return false;
    res.push(value);
    this.save();
    return true;
  }

  public get(key: any) {
    let res: any = this.config;
    key.split('.')
      .forEach(k => res = res[k]);
    return res;
  }

  public getEnv(key: any) {
    return this.env[key];
  }

  public load() {
    return new Promise((resolve, reject) => {
      this.http.get('../../assets/env.json', {headers: this.headers})
        .map(res => res.json())
        .catch((error: any): any => {
          console.log('Configuration file "env.json" could not be read');
          resolve(true);
          return Observable.throw(error.json().error || 'Server error');
        }).subscribe((envResponse) => {
        this.env = envResponse;
        let request: any = null;


        switch (envResponse.env) {
          case 'production': {
            this.configPath += envResponse.env + '.json';
            request = this.http.get(this.configPath);
          }
            break;

          case 'development': {
            this.configPath += envResponse.env + '.json';
            request = this.http.get(this.configPath);
          }
            break;

          case 'default': {
            console.error('Environment file is not set or invalid');
            resolve(true);
          }
            break;
        }

        if (request) {
          request
            .map(res => res.json())
            .catch((error: any) => {
              console.error('Error reading ' + envResponse.env + ' configuration file');
              resolve(error);
              return Observable.throw(error.json().error || 'Server error');
            })
            .subscribe((responseData) => {
              this.config = responseData;
              resolve(true);
            });
        } else {
          console.error('Env config file "env.json" is not valid');
          resolve(true);
        }
      });

    });
  }

  private save() {
    console.log(this.location.getBaseHrefFromDOM());
  }

}
