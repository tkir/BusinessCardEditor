import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule}   from '@angular/forms';

import {AppComponent} from './app.component';
import {EditorComponent} from './editor/editor.component';
import {DesignComponent} from './design/design.component';
import {EditorContainerComponent} from './editor-container/editor-container.component';

import {DataService} from "./data/data.service";
import {ResultComponent} from './result/result.component';
import {StyleEditorComponent} from './editor/style-editor/style-editor.component';
import {MovableDirective} from './result/movable.directive';
import {Store} from "./data/store";
import {DroppableDirective} from './result/droppable.directive';
import {ImageService} from "./utils/image.service";
import {BackgroundEditorComponent} from './editor/background-editor/background-editor.component';
import { ColorPickerComponent } from './editor/color-picker/color-picker.component';
import { HrComponent } from './hr/hr.component';
import { HrEditorComponent } from './editor/hr-editor/hr-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    DesignComponent,
    EditorContainerComponent,
    ResultComponent,
    StyleEditorComponent,
    MovableDirective,
    DroppableDirective,
    BackgroundEditorComponent,
    ColorPickerComponent,
    HrComponent,
    HrEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [Store, DataService, ImageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
