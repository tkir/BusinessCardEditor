import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {AppConfigService} from "./app-config.service";
import {PlatformLocation} from "@angular/common";

@Injectable()
export class PdfService {

  private pdfAPI: string;
  private pdfPath: string;
  private hash:string;

  constructor(private api: ApiService,
              private config: AppConfigService,
              private location: PlatformLocation) {
    this.pdfAPI = config.get('host.api.endpoint');
    this.pdfPath = config.get('host.api.pdf');
    this.hash=config.get('hash');
  }

  post(data) {
    return this.api.post(`${this.pdfAPI}${this.pdfPath}/${this.hash}`,
      {base_href: this.location.getBaseHrefFromDOM(), data: data});
  }

}
