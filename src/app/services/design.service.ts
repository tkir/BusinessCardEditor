import {Injectable} from '@angular/core';
import {AppConfigService} from "./app-config.service";
import {DbService} from "./db.service";
import {CardData} from "../data/CardData";
import {CardDesignData, CardFieldsData} from "../data/interfaces";
import {DesignStore} from "./design-store";
const objectHash = require('object-hash');

@Injectable()
export class DesignService {

  constructor(private config: AppConfigService,
              private db: DbService, private store:DesignStore) {
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

    this.config.post('allowedDesigns', cardHash);
    this.updateDesignes(this.config.get('allowedDesigns'));
    // return this.db.post(
    //   `${this.path}/${this.config.get('hash')}/${cardHash}`, obj);
  }

  getAllowedDesignes(){
    this.updateDesignes(this.config.get('allowedDesigns'));

    return this.store.changes;
  }

  updateDesignes(state){
    let currentState = state;
    return this.store.state = currentState;
  }

}
