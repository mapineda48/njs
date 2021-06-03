import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { render } from '../common';

import { FooComponent } from '../app/component/foo/foo.component';

@NgModule({
  declarations: [
    FooComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [FooComponent]
})
export class AppModule { }


render(AppModule)