import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { DesignComponent } from './design/design.component';
import { EditorContainerComponent } from './editor-container/editor-container.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    DesignComponent,
    EditorContainerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
