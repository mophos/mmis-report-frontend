import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'cm-new',
  templateUrl: './new.component.html',
  styles: []
})
export class NewComponent implements OnInit {
  
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  token: any;
  jwtHelper: JwtHelper = new JwtHelper();
  products: any = [];
  
  constructor() { }

  ngOnInit() {
  }

}
