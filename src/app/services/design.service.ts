import {Injectable} from '@angular/core';
import {AppConfigService} from "./app-config.service";
import {DbService} from "./db.service";
import {CardData} from "../data/CardData";
import {CardDesignData, CardFieldsData} from "../data/interfaces";
const objectHash = require('object-hash');

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

  saveDesign(fieldsData: CardFieldsData, designData: CardDesignData, preview: any) {
    let obj = {
      fieldsData: fieldsData,
      designData: designData
    };

    let cardHash = objectHash(obj);

    return this.db.post(
      `${this.path}/${this.config.get('hash')}/${cardHash}`, obj);
  }

}
