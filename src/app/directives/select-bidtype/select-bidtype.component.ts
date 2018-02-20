import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { StandardService } from '../../services/standard.service';
import { AlertService } from '../../services/alert.service';
import { BidType } from '../../interfaces/bid-type';

@Component({
  selector: 'cm-select-bidtype',
  templateUrl: './select-bidtype.component.html',
  styles: []
})
export class SelectBidtypeComponent implements OnInit {

  @Input() public selectedId: any;
  @Input() public disabled: any;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  loading = false;
  items: BidType[] = [];

  constructor(private standardService: StandardService, private alertService: AlertService) { }

  async ngOnInit() {
    await this.getItems();
  }

  async getItems() {
    try {
      this.loading = true;
      let rs: any = await this.standardService.getBidTypes();
      this.loading = false;
      if (rs.ok) {
        this.items = rs.rows;
        if (this.items.length) {
          if (this.selectedId) {
            const idx = _.findIndex(this.items, { bgtype_id: this.selectedId });
            if (idx > -1) {
              this.onChange.emit(this.items[idx]);
            } else {
              this.onChange.emit(this.items[0]);
            }
          } else {
            this.selectedId = this.items[0].bid_id;
            this.onChange.emit(this.items[0]);
          }
        }

      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      console.log(error);
      this.alertService.error()
    }
  }

  setSelected(event: any) {
    const idx = _.findIndex(this.items, { bid_id: +event.target.value });
    if (idx > -1) {
      this.onChange.emit(this.items[idx]);
    }
  }
}
