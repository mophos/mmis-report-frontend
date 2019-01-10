import { HtmlPreviewComponent } from './loading/html-preview/html-preview.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule
  ],
  declarations: [
    LoadingComponent,
    HtmlPreviewComponent
  ],
  exports: [
    LoadingComponent,
    HtmlPreviewComponent]
})
export class ModalsModule { }
