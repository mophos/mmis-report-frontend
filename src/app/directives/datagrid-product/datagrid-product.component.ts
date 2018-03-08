import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { ContractService } from '../../services/contract.service';

@Component({
  selector: 'cm-datagrid-product',
  templateUrl: './datagrid-product.component.html',
  styles: []
})
export class DatagridProductComponent implements OnInit {

  @Input('contractId') contractId: any;

  loading: boolean = false;
  items: any = [];

  constructor(
    private alertService: AlertService,
    private contractService: ContractService
  ) { }

  ngOnInit() {
    this.getItems();
  }

  async getItems() {
    this.loading = true;
    try {
      let rs: any = await this.contractService.getProductItems(this.contractId);
      if (rs.ok) {
        this.items = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }

      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.error(JSON.stringify(error));
    }
  }

}
