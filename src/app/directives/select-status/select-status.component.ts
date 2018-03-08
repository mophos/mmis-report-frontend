import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { AlertService } from '../../services/alert.service';
import { StandardService } from '../../services/standard.service';
import { ContractStatus } from '../../interfaces/contract-status';

@Component({
  selector: 'cm-select-status',
  templateUrl: './select-status.component.html',
  styles: []
})
export class SelectStatusComponent implements OnInit {
  @Input() public selectedId: any;
  @Input() public disabled: any;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  loading = false;
  items: ContractStatus[] = [];
  _statusId: any = [];

  constructor(private standardService: StandardService, private alertService: AlertService) { }

  async ngOnInit() {
    await this.getStatus();
  }

  async getStatus() {
    try {
      this.loading = true;
      let rs: any = await this.standardService.getStatus();
      this.loading = false;
      if (rs.ok) {
        this.items = rs.rows;
        if (this.items.length) {
          if (this.selectedId) {
            this._statusId = this.selectedId;
            const idx = _.findIndex(this.items, { status_id: this.selectedId });
            if (idx > -1) {
              this.onChange.emit(this.items[idx]);
            } else {
              this.onChange.emit(this.items[0]);
            }
          } else {
            this._statusId = this.items[0].status_id;
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
    const idx = _.findIndex(this.items, { status_id: +event.target.value });
    if (idx > -1) {
      this.onChange.emit(this.items[idx]);
    }

  }

}
