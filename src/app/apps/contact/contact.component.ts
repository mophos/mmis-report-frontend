import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cm-contact',
  templateUrl: './contact.component.html',
  styles: []
})
export class ContactComponent implements OnInit {
  waitingApproves: any = [];
  
  constructor() { }

  ngOnInit() {
  }

}
