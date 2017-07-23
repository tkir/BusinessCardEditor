import {EventEmitter, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Logo} from "../data/Logo";
import {ImageResult} from "./image/interfaces";
import {ImageUpload} from "./image/image-upload";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class ImageService implements OnInit, OnDestroy {

  private logo: Logo;
  private imageUpload: ImageUpload;
  private subscription: Subscription = null;

//TODO to config
  private resizeQuality: number = 1;
  private resizeType: string = 'image/png';
  private allowedExtensions: string[] = ['jpg', 'jpeg', 'png'];

  constructor() {
    this.imageUpload = new ImageUpload();
    this.subscription = this.imageUpload.imageSelected
      .subscribe((res: ImageResult) => this.updateLogo(res));
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    this.subscription = null;
  }

  uploadLogo(logo: Logo, image: File) {
    this.logo = logo;

    let resizeOptions = {
      resizeMaxHeight: logo.maxHeight,
      resizeMaxWidth: logo.maxWidth,
      resizeQuality: this.resizeQuality,
      resizeType: this.resizeType
    };

    this.imageUpload.readFiles(image, resizeOptions, this.allowedExtensions);

  }

  private updateLogo(imageResult: ImageResult) {
    if(imageResult.resized) {
      this.logo.width = imageResult.resized.width;
      this.logo.height=imageResult.resized.height;
      this.logo.dataType=imageResult.resized.type;
      this.logo.src=imageResult.resized.dataURL;
    }

    //TODO обработать ошибки загрузки файлов
    if(imageResult.error)console.error(imageResult.error);
  }

}
