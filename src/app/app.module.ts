import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { DesignComponent } from './design/design.component';
import { EditorContainerComponent } from './editor-container/editor-container.component';

import {DataService} from "./data/data.service";
import { ResultComponent } from './result/result.component';
import { StyleEditorComponent } from './editor/style-editor/style-editor.component';
import { MovableDirective } from './result/movable.directive';
import {Store} from "./data/store";

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    DesignComponent,
    EditorContainerComponent,
    ResultComponent,
    StyleEditorComponent,
    MovableDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [Store, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
