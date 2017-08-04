import {Injectable} from '@angular/core';
import {AppConfigService} from "./app-config.service";
import {DbService} from "./db.service";

@Injectable()
export class DesignService {

  constructor(private config: AppConfigService,
              private db: DbService) {
    this.path = this.config.get('host.db.design');
  }

  private path: string;

  getDesign(design: string) {
    return this.db.get(`${this.path}/${design}`);
  }

}
