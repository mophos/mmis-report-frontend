import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectUnitsComponent } from './select-units/select-units.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule
  ],
  declarations: [SelectUnitsComponent]
})
export class DirectivesModule { }
