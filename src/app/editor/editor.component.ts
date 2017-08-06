import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";
import {CardData} from "../data/CardData";
import {TextField} from "../data/TextField";
import {Subscription} from "rxjs/Subscription";
import {Store} from "../services/store";
import {ImageService} from "../services/image.service";
import {Logo} from "../data/Logo";
import {Line} from "../data/Line";
import {AppConfigService} from "../services/app-config.service";
import {PdfService} from "../services/pdf.service";

@Component({
  selector: 'card-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

  model: CardData = null;
  selectedItem: TextField = null;
  selectedInput: any = null;

  private subscription: Subscription;

  constructor(private dataService: DataService,
              private store: Store,
              private imageService: ImageService,
              private pdfService: PdfService,
              private config: AppConfigService) {
  }

  ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => this.model = cardData);
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  addTextField(items: TextField[], i?: number) {

    let newText: TextField = new TextField('', this.getItemFont(), 1.2, "normal", "normal", "none", '000', 30, 5);

    if (items && items.length) {
      Object.keys(items[i]).forEach(key => newText[key] = items[i][key]);
      newText.top += 20;
    }

    newText.setConstants(this.config);
    items.push(newText);
    this.dataService.updateCard(this.model);
  }

  addLogo(items: Logo[], i?: number) {

    let newLogo: Logo = new Logo(this.config.get('default.logo'), 22, 10, 5, 5);

    newLogo.setConstants(this.config);
    items.push(newLogo);
    this.dataService.updateCard(this.model);
  }

  addLine(lines: Line[], i) {
    let newLine: Line = new Line(0, 30, 45, 1, true, 'solid', '00f');
    newLine.setConstants(this.config);
    lines.push(newLine);
    this.dataService.updateCard(this.model);
  }

  private getItemFont(): string {
    let fontFamily;
    this.model.fields.forEach(item => {
      if (item.instanceOf == 'Text') fontFamily = item.fontFamily;
    });

    return fontFamily;
  }

  removeItem(items, i) {
    items.splice(i, 1);

    this.dataService.updateCard(this.model);
  }

  focusItem(item: TextField, event) {
    this.model.fields.forEach(item => {
      if (item.isSelected) item.isSelected = false;
    });

    item.isSelected = true;
    this.selectedItem = item;
    this.selectedInput = event.target;
  }

  blurItem() {
    if (!this.selectedItem.isStyling) {
      this.selectedItem.isSelected = false;
      this.selectedItem = null;
      this.selectedInput = null;
    }
  }

  onFocusReturn() {
    this.selectedInput.focus();
  }

  uploadImage(item, event) {
    if (event.target.files.length)
      this.imageService.uploadImage(item, event.target.files[0]);
  }

  save() {
    console.log(JSON.stringify(this.model));
  }

  getPDF() {
    this.pdfService.post(this.model.json)
      .subscribe(res => {});
  }
}
