import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { AgxTypeaheadModule } from '@siteslave/agx-typeahead';
import { SearchVendorsComponent } from './search-vendors/search-vendors.component';
import { SelectTypeComponent } from './select-type/select-type.component';
import { SelectStatusComponent } from './select-status/select-status.component';
import { SelectPositionComponent } from './select-position/select-position.component';
import { ContractService } from '../services/contract.service';
import { SearchProductComponent } from './search-product/search-product.component';
import { StandardService } from '../services/standard.service';
import { SelectUnitComponent } from './select-unit/select-unit.component';
import { NumberWithoutDotDirective } from './number-without-dot.directive';
import { NumberOnlyDirective } from './number-only.directive';
import { SelectBidtypeComponent } from './select-bidtype/select-bidtype.component';
import { SelectBgtypeComponent } from './select-bgtype/select-bgtype.component';
import { DatagridProductComponent } from './datagrid-product/datagrid-product.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    AgxTypeaheadModule
  ],
  declarations: [
    SearchVendorsComponent,
    SelectTypeComponent,
    SelectStatusComponent,
    SelectPositionComponent,
    SearchProductComponent,
    SelectUnitComponent,
    NumberWithoutDotDirective,
    NumberOnlyDirective,
    SelectBidtypeComponent,
    SelectBgtypeComponent,
    DatagridProductComponent
  ],
  exports: [
    SearchVendorsComponent,
    SelectStatusComponent,
    SelectPositionComponent,
    SelectTypeComponent,
    SearchProductComponent,
    SelectUnitComponent,
    NumberWithoutDotDirective,
    NumberOnlyDirective,
    SelectBidtypeComponent,
    SelectBgtypeComponent,
    DatagridProductComponent
  ],
  providers: [ContractService, StandardService]
})
export class DirectivesModule { }
