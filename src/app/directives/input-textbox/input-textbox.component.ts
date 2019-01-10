import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-textbox',
  templateUrl: './input-textbox.component.html',
  styles: []
})
export class InputTextboxComponent implements OnInit {

  @Input('reportDetailId') reportDetailId: any;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  text: any;
  constructor() { }

  ngOnInit() {
  }

  setSelected(event: any) {
    // const idx = _.findIndex(this.items, { status_id: +event.target.value });
    // if (idx > -1) {
    const obj = {
      reportDetailId: this.reportDetailId,
      value: this.text
    };
    this.onChange.emit(obj);
    // }

  }
}
