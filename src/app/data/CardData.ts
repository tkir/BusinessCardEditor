import {Logo} from "./Logo";
import {Background} from "./Background";
import {Text} from "./TextCSS";
import {Line} from "./Line";
let WebFont = require('webfontloader');

export class CardData {
  constructor(public owners: Text[],
              public positions: Text[],
              public organisations: Text[],
              public addresses: Text[],
              public phones: Text[],
              public emails: Text[],
              public sites: Text[],
              public logos: Logo[],
              public lines: Line[],
              public background: Background) {
    this.update();
  }

  private fields=[];

  public update(){
    Object.keys(this).forEach(key =>{
      if (Array.isArray(this[key]))
        this.fields.push(...this[key]);
      else this.fields.push(this[key]);
    });

    this.updateSize();
  }

  onChangeBgSize(){
    this.fields.forEach(field=>{
      if(field.instanceOf=='Text' || field.instanceOf=='Logo' || field.instanceOf=='Line')
        field.onChangeBgSize(this.background);
    })
  }

  public setConstants(config) {
    this.fields.forEach(field=>field.setConstants(config));
  }

  //todo обновить все макс размеры
  private updateSize(){
    this.logos.forEach(logo => logo.setMax(this.background.width, this.background.height));
  }

  public getFieldsData():CardFieldsData{
    return new CardFieldsData(
      this.owners.map(txt=>txt.text),
      this.positions.map(txt=>txt.text),
      this.organisations.map(txt=>txt.text),
      this.addresses.map(txt=>txt.text),
      this.phones.map(txt=>txt.text),
      this.emails.map(txt=>txt.text),
      this.sites.map(txt=>txt.text),
      this.logos.map(logo=>logo.src),
    );
  }
}

export class CardFieldsData{
  constructor(
    public owners: string[],
    public positions: string[],
    public organisations: string[],
    public addresses: string[],
    public phones: string[],
    public emails: string[],
    public sites: string[],
    public logos: string[]
  ){}

}

export class CardDesignData{
  constructor(
    public owners: TextDesign[],
    public positions: TextDesign[],
    public organisations: TextDesign[],
    public addresses: TextDesign[],
    public phones: TextDesign[],
    public emails: TextDesign[],
    public sites: TextDesign[],
    public logos: LogoDesign[],
    public lines: LineDesign[],
    public background: BgDesign
  ){}
}

export class TextDesign{
  constructor(public fontFamily: string,
              public fontSize_mm: number,
              public fontWeight: string,
              public fontStyle: string,
              public textDecoration: string,
              public textAlign: string,
              public colorStr: string,
              public left_mm: number,
              public top_mm: number){}
}
export class LogoDesign{
  constructor(public width_mm: number,
              public height_mm: number,
              public left_mm: number,
              public top_mm: number){}
}
export class LineDesign{
  constructor(public left_mm: number,
              public top_mm: number,
              public length_mm: number,
              public _thickness: number,
              public isHorizontal: boolean = true,
              public design: string = 'solid',
              public _color: string = '000'){}
}
export class BgDesign{
  constructor(public _backgroundColor: string,
              public src: string,
              public width_mm: number,
              public height_mm: number){}
}

export function cardFactory(fData:CardFieldsData, dData:CardDesignData, config){

  let owners: Text[] = createText(fData.owners, dData.owners);
  let positions:Text[]=createText(fData.positions, dData.positions);
  let organisations:Text[]= createText(fData.organisations, dData.organisations);
  let addresses:Text[]=createText(fData.addresses, dData.addresses);
  let phones:Text[]=createText(fData.phones, dData.phones);
  let emails:Text[]=createText(fData.emails, dData.emails);
  let sites:Text[]=createText(fData.sites, dData.sites);

  let logos: Logo[] = dData.logos.map((d, i) => {
    if (fData.logos[i]) return new Logo(
      fData.logos[i],
      d.width_mm,
      d.height_mm,
      d.left_mm,
      d.top_mm
    );
  });

  let lines:Line[]=dData.lines.map((d,i)=>new Line(
    d.left_mm, d.top_mm, d.length_mm, d._thickness, d.isHorizontal, d.design, d._color
  ));

  let bg:Background=new Background(
    dData.background._backgroundColor, dData.background.src, dData.background.width_mm, dData.background.height_mm
  );

  //подгружаем уникальные шрифты
  loadedFonts = loadedFonts.filter(onlyUnique);
  loadedFonts.forEach(font =>
    WebFont.load({
      google: {
        families: [font]
      }
    }));

  let cardData=new CardData(owners, positions, organisations, addresses, phones, emails, sites, logos, lines, bg);
  cardData.setConstants(config);
  return cardData;
}

function createText(fStrs: string[], tDsns: TextDesign[]): Text[] {

    let fonts = tDsns.map(d => d.fontFamily);
    loadedFonts.push(...fonts);

  return tDsns.map((d, i) => {
    if (fStrs[i])return new Text(
      fStrs[i],
      d.fontFamily,
      d.fontSize_mm,
      d.fontWeight,
      d.fontStyle,
      d.textDecoration,
      d.textAlign,
      d.colorStr,
      d.left_mm,
      d.top_mm
    );
  });
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

var loadedFonts:string[]=[];
