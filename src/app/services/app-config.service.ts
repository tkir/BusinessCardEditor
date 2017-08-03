import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
let root = require('app-root-path');

@Injectable()
export class AppConfigService {

  private config: Object = null;
  private env: Object = null;

  constructor(private http: Http) {
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
      this.http.get(root + '/assets/env.json')
        .map(res => res.json())
        .catch((error: any): any => {
          console.log('Configuration file "env.json" could not be read');
          resolve(true);
          return Observable.throw(error.json().error || 'Server error');
        }).subscribe((envResponse) => {
        this.env = envResponse;
        let request: any = null;

        //TODO перед production убрать '../../'
        switch (envResponse.env) {
          case 'production': {
            request = this.http.get('../../assets/config.' + envResponse.env + '.json');
          }
            break;

          case 'development': {
            request = this.http.get('../../assets/config.' + envResponse.env + '.json');
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

}
