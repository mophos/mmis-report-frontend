import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ContractComponent } from './contract/contract.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  {
    path: 'apps', component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'contracts', pathMatch: 'full' },
      { path: 'new', component: NewComponent },
      { path: ':contractId/edit', component: NewComponent },
      { path: 'contracts', component: ContractComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
