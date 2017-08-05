export class PdfCreator {
  public getHTML(obj):Element {
    Object.keys(obj)
      .forEach(key => obj[key].forEach(item => {
          let div = document.createElement('div');
          div.setAttribute('style', item.getDivStyle(this.k, ++this.z));

          switch (key) {
            case 'Text':
              let span = document.createElement('span');
              span.setAttribute('style', item.getSpanStyle(this.k));
              span.innerText = item.text;
              div.appendChild(span);
              this.txtElems.push(div);
              break;

            case 'Logo':
              this.logoElems.push(div);
              break;

            case 'Line':
              this.lineElems.push(div);
              break;

            case 'Background':
              this.bgElem = div;
              break;
          }
        })
      );

    if (this.bgElem) {
      this.logoElems.forEach(logo => this.bgElem.appendChild(logo));
      this.lineElems.forEach(line => this.bgElem.appendChild(line));
      this.txtElems.forEach(txt => this.bgElem.appendChild(txt));
    }

    return this.bgElem;
  }

  public k: number = 1;
  private z = 100;

  private txtElems: Element[] = [];
  private logoElems: Element[] = [];
  private lineElems: Element[] = [];
  private bgElem: Element;
}
