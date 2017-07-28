import {Injectable} from '@angular/core';
import {Text} from "../data/TextCSS";

@Injectable()
export class AlignService {

  public textFields: Text[] = [];
  public isMultiselection = false;

  public alignTextFields(alLine: string) {
    if (this.isMultiselection) {
      switch (alLine) {
        case 'left':
          this.textFields.forEach(tf => tf.left = this.textFields[0].left);
          break;
        case 'middle':
          this.textFields.forEach(tf => tf.middle = this.textFields[0].middle);
          break;
        case 'right':
          this.textFields.forEach(tf => tf.right = this.textFields[0].right);
          break;
      }
    }
  }
}
