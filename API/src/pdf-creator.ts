import {Background, Line, Logo, TextField} from "./classes";
let pdf = require('html-pdf');

export class PdfCreator {


  // constructor(private k: number = 3.78,
  //             private z: number = 100) {
  // }

  private static getHTML(obj, k: number = 3.78, z: number = 100): string {

    let textArr: string[] = [];
    let logoArr: string[] = [];
    let lineArr: string[] = [];
    let bg: string = '';

    Object.keys(obj)
      .forEach(key => obj[key].forEach(it => {
          let item;

          switch (key) {
            case 'Text':
              item = new TextField(it);

              textArr.push(`
<div style="${item.getDivStyle(k, ++z)}">
  <span style="${item.getSpanStyle(k)}">${item.text}</span>
</div>
              `);
              break;

            case 'Logo':
              item = new Logo(it);
              logoArr.push(`<div style="${item.getDivStyle(k, ++z - 60)}"></div>`);
              break;

            case 'Line':
              item = new Line(it);
              lineArr.push(`<div style="${item.getDivStyle(k, ++z - 50)}"></div>`);
              break;

            case 'Background':
              item = new Background(it);
              bg = `<body style="${item.getDivStyle(k, 0)}">`;
              break;
          }
        })
      );


    if (bg != '') {
      logoArr.forEach(logo => bg += logo);
      lineArr.forEach(line => bg += line);
      textArr.forEach(txt => bg += txt);
      bg += '</body>';
    }

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
    </head>
    ${bg};
    </html>`;
  }

  public static getPDF(obj, cb) {
    let config = {
      "height": `${obj.Background[0].height_mm}mm`,
      "width": `${obj.Background[0].width_mm}mm`
    };
    let html = PdfCreator.getHTML(obj);

    pdf.create(html, config)
      .toBuffer((err, buffer) => cb(err, buffer));
  }
}
