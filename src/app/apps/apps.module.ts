import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppsRoutingModule } from './apps-routing.module';
import { LayoutComponent } from './layout.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { NewComponent } from './new/new.component';
import { MyDatePickerTHModule } from 'mydatepicker-th';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    MyDatePickerTHModule,
    AppsRoutingModule
  ],
  declarations: [
    LayoutComponent,
    ContactComponent,
    NewComponent
  ]
})
export class AppsModule { }
