import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { AlertService } from '../../services/alert.service';
// import { ContractType } from '../../interfaces/contract-type'
import { StandardService } from '../../services/standard.service';

@Component({
  selector: 'app-select-warehouse',
  templateUrl: './select-warehouse.component.html',
  styles: []
})
export class SelectWarehouseComponent implements OnInit {

  @Input() public selectedId: any;
  @Input() public disabled: any;
  @Input('reportDetailId') reportDetailId: any;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  loading = false;
  items = [];
  _selectedId: any = [];

  constructor(private standardService: StandardService, private alertService: AlertService) { }

  async ngOnInit() {
    await this.getItems();
  }

  async getItems() {
    try {
      this.loading = true;
      const rs: any = await this.standardService.getWarehouse();
      this.loading = false;
      if (rs.ok) {
        this.items = rs.rows;
        if (this.items.length) {
          if (this.selectedId) {
            // this._selectedId = this.selectedId;
            // const idx = _.findIndex(this.items, { status_id: this.selectedId });
            // if (idx > -1) {

            //   this.onChange.emit(this.items[idx]);
            // } else {
            //   this.onChange.emit(this.items[0]);
            // }
          } else {
            this._selectedId = this.items[0].warehouse_id;
            const obj = {
              reportDetailId: this.reportDetailId,
              value: this.items[0].warehouse_id
            };
            this.onChange.emit(obj);
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
    const idx = _.findIndex(this.items, { warehouse_id: +event.target.value });
    if (idx > -1) {
      const obj = {
        reportDetailId: this.reportDetailId,
        value: this.items[idx].warehouse_id
      };
      this.onChange.emit(obj);
    }
  }

}
