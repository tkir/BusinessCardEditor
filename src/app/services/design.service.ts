import {Injectable} from '@angular/core';
import {AppConfigService} from "./app-config.service";
import {ApiService} from "./api.service";

@Injectable()
export class DesignService {

  constructor(private config: AppConfigService,
              private api: ApiService) {
    this.path = this.config.get('api.design');
  }

  private path: string;

  getDesign(design: string) {
    return this.api.get(`${this.path}/${design}`);
  }

}
