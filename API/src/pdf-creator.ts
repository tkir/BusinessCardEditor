import {Background, Line, Logo, TextField} from "./classes";
let pdf = require('html-pdf');

export class PdfCreator {

  private textArr: string[] = [];
  private logoArr: string[] = [];
  private lineArr: string[] = [];
  private bg: string;

  constructor(private k: number = 3.78,
              private z: number = 100) {
  }

  private getBg(obj): string {
    Object.keys(obj)
      .forEach(key => obj[key].forEach(it => {
          let item;

          switch (key) {
            case 'Text':
              item = new TextField(it);

              this.textArr.push(`
<div style="${item.getDivStyle(this.k, ++this.z)}">
  <span style="${item.getSpanStyle(this.k)}">${item.text}</span>
</div>
              `);
              break;

            case 'Logo':
              item = new Logo(it);
              this.logoArr.push(`<div style="${item.getDivStyle(this.k, ++this.z - 60)}"></div>`);
              break;

            case 'Line':
              item = new Line(it);
              this.lineArr.push(`<div style="${item.getDivStyle(this.k, ++this.z - 50)}"></div>`);
              break;

            case 'Background':
              item = new Background(it);
              this.bg = `<div style="${item.getDivStyle(this.k, 0)}">`;
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

  private getHTML(obj): string {
    let bg = this.getBg(obj);
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
</head>
<body style="margin: 0; padding: 0;">
${bg};
</body>
</html>`
  }

  public getPDF(obj, cb) {
    let config = {
      "height": `${obj.Background[0].height_mm}mm`,
      "width": `${obj.Background[0].width_mm}mm`
    };
    let html = this.getHTML(obj);

    pdf.create(html, config)
      .toBuffer((err, buffer) => cb(err, buffer));
  }
}
