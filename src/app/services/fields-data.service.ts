import { Injectable } from '@angular/core';
import {AppConfigService} from "./app-config.service";
import {ApiService} from "./api.service";

@Injectable()
export class FieldsDataService {

  constructor(private config: AppConfigService,
              private api: ApiService) {
    this.path = this.config.get('api.data');
  }

  private path: string;

  getFieldsData(fieldData: string = 'default') {
    return this.api.get(`${this.path}/${fieldData}`);
  }

}
