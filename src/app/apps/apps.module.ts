import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppsRoutingModule } from './apps-routing.module';
import { LayoutComponent } from './layout.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { AlertService } from '../services/alert.service';
import { AuthModule } from '../auth/auth.module';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { ModalsModule } from '../modals/modals.module';
import { AuthGuard } from '../auth-guard.service';
import { ReportsComponent } from './reports/reports.component';
import { ReportService } from '../services/report.service';
import { ReportNewComponent } from './report-new/report-new.component';
import { ReportParameterComponent } from './report-parameter/report-parameter.component';
import { ReportSystemsComponent } from './report-systems/report-systems.component';
import { ReportSystemNewComponent } from './report-system-new/report-system-new.component';
import { ReportSystemParameterComponent } from './report-system-parameter/report-system-parameter.component';
import { ReportSystemService } from '../services/report-system.service';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    AuthModule,
    MyDatePickerTHModule,
    DirectivesModule,
    PipesModule,
    AppsRoutingModule,
    ModalsModule
  ],
  declarations: [
    LayoutComponent,
    ReportsComponent,
    ReportNewComponent,
    ReportParameterComponent,
    ReportSystemsComponent,
    ReportSystemNewComponent,
    ReportSystemParameterComponent
  ],
  providers: [
    AlertService,
    AuthGuard,
    ReportService,
    ReportSystemService
  ]
})
export class AppsModule { }
