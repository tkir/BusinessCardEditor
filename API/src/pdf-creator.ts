import {Background, Line, Logo, TextField} from "./classes";
import {compile} from 'json-schema-to-typescript'

export class PdfCreator {

  private textArr: string[] = [];
  private logoArr: string[] = [];
  private lineArr: string[] = [];
  private bg: string;

  constructor(private k: number = 10,
              private z: number = 100) {
  }

  public getHTML(obj): string {
    Object.keys(obj)
      .forEach(key => obj[key].forEach(it => {
          let item;

          switch (key) {
            case 'Text':
              item = new TextField(it);
              this.textArr.push(
                '<div style="' + item.getDivStyle(this.k, ++this.z) +
                '"><span style="' + item.getSpanStyle(this.k) + '">' + item.text +
                '</span></div>');
              break;

            case 'Logo':
              item = new Logo(it);
              this.logoArr.push(
                '<div style="' + item.getDivStyle(this.k, ++this.z - 100) + '"></div>'
              );
              break;

            case 'Line':
              item = new Line(it);
              this.lineArr.push(
                '<div style="' + item.getDivStyle(this.k, ++this.z - 50) + '"></div>'
              );
              break;

            case 'Background':
              item = new Background(it);
              this.bg = '<div style="' + item.getDivStyle(this.k, ++this.z - 50) + '">';
              break;
          }
        })
      );

    if (this.bg) {
      this.logoArr.forEach(logo => this.bg += logo);
      this.lineArr.forEach(line => this.bg += line);
      this.textArr.forEach(txt => this.bg += txt);
      this.bg += '</div>';
    }

    return this.bg;
  }
}
