import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ContractComponent } from './contract/contract.component';
import { NewComponent } from './new/new.component';
import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [
  {
    path: 'apps', component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'contracts', pathMatch: 'full' },
      { path: 'new', component: NewComponent },
      { path: 'contracts', component: ContractComponent },
      { path: 'contracts/:contractId/edit', component: NewComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
