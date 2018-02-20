import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppsRoutingModule } from './apps-routing.module';
import { LayoutComponent } from './layout.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { ContractComponent } from './contract/contract.component';
import { NewComponent } from './new/new.component';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { ContractService } from '../services/contract.service';
import { AlertService } from '../services/alert.service';
import { AuthModule } from '../auth/auth.module';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { ModalsModule } from '../modals/modals.module';

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
    ContractComponent,
    NewComponent
  ],
  providers: [ContractService, AlertService]
})
export class AppsModule { }
