import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToThaiDatePipe } from './to-thai-date.pipe';
import { ToThaiDateTimePipe } from './to-thai-date-time.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ToThaiDatePipe, ToThaiDateTimePipe],
  exports: [ToThaiDatePipe, ToThaiDateTimePipe]
})
export class PipesModule { }
