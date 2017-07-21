import 'rxjs/Rx';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Injectable} from "@angular/core";

import {Logo} from "./Logo";
import {Background} from "./Background";
import {Text} from "./TextCSS";
import {CardData} from "./CardData";

export interface Data {
  owners: Text[],
  positions: Text[],
  organisations: Text[],
  addreses: Text[],
  phones: Text[],
  emails: Text[],
  sites: Text[],
  logos: Logo[],
  background: Background
}

export interface State {
  data: Data;
}

const defaultState: State = {
  data: Object.create(CardData)
};

const _store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class Store {
  private store = _store;
  private _changes = this.store.asObservable();

  set state(state: State) {
    this.store.next(state);
  }

  get state(): State {
    return this.store.value;
  }

  get changes(){
    return this._changes;
  }

  purge() {
    this.store.next(defaultState);
  }
}
