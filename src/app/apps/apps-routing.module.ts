import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../auth-guard.service';
import { ReportsComponent } from './reports/reports.component';
import { ReportNewComponent } from './report-new/report-new.component';

const routes: Routes = [
  {
    path: 'apps', component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'reports', pathMatch: 'full' },
      { path: 'reports', component: ReportsComponent },
      { path: 'report-new', component: ReportNewComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
