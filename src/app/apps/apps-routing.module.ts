import { ReportSystemNewComponent } from './report-system-new/report-system-new.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../auth-guard.service';
import { ReportsComponent } from './reports/reports.component';
import { ReportNewComponent } from './report-new/report-new.component';
import { ReportParameterComponent } from './report-parameter/report-parameter.component';
import { ReportSystemsComponent } from './report-systems/report-systems.component';
import { ReportSystemParameterComponent } from './report-system-parameter/report-system-parameter.component';

const routes: Routes = [
  {
    path: 'apps', component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'reports', pathMatch: 'full' },
      { path: 'reports', component: ReportsComponent },
      { path: 'report-new', component: ReportNewComponent },
      { path: 'report-parameter', component: ReportParameterComponent },
      { path: 'report-system', component: ReportSystemsComponent },
      { path: 'report-system-new', component: ReportSystemNewComponent },
      { path: 'report-system-parameter', component: ReportSystemParameterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
