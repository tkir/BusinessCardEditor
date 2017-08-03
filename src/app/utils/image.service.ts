import {EventEmitter, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Logo} from "../data/Logo";
import {ImageResult} from "./image/interfaces";
import {ImageUpload} from "./image/image-upload";
import {Subscription} from "rxjs/Subscription";
import {AppConfigService} from "../services/app-config.service";

@Injectable()
export class ImageService implements OnInit, OnDestroy {

  private item;
  private imageUpload: ImageUpload;
  private subscription: Subscription = null;
  private resizeQuality: number;
  private resizeType: string;
  private allowedExtensions: string[] = [];

  constructor(private config:AppConfigService) {
  }

  ngOnInit() {
    this.imageUpload = new ImageUpload();
    this.subscription = this.imageUpload.imageSelected
      .subscribe((res: ImageResult) => this.updateLogo(res));

    this.resizeQuality=this.config.get('imageUpload.resizeQuality');
    this.resizeType=this.config.get('imageUpload.resizeType');
    this.allowedExtensions=this.config.get('imageUpload.allowedExtensions');
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    this.subscription = null;
  }

  uploadImage(item, image: File) {
    this.item = item;

    let resizeOptions = {
      resizeMaxHeight: item.maxHeight,
      resizeMaxWidth: item.maxWidth,
      resizeQuality: this.resizeQuality,
      resizeType: this.resizeType
    };

    this.imageUpload.readFiles(image, resizeOptions, this.allowedExtensions);

  }

  private updateLogo(imageResult: ImageResult) {
    if(imageResult.resized) {
      this.item.width = imageResult.resized.width;
      this.item.height=imageResult.resized.height;
      this.item.dataType=imageResult.resized.type;
      this.item.src=imageResult.resized.dataURL;
    }

    //TODO обработать ошибки загрузки файлов
    if(imageResult.error)console.error(imageResult.error);
  }

}
