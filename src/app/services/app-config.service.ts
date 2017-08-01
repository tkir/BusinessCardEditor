import { Injectable } from '@angular/core';
import {ConfigService} from "@ngx-config/core";

@Injectable()
export class AppConfigService {

  constructor(private readonly _config: ConfigService) { }

  get config(){
    return this._config;
  }

}
