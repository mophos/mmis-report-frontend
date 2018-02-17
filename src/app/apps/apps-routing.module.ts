import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ContactComponent } from './contact/contact.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  {
    path: 'apps', component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'contacts', pathMatch: 'full' },
      { path: 'new', component: NewComponent },
      { path: 'contacts', component: ContactComponent }
    ]
  },
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
