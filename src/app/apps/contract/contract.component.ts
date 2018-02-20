import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../services/contract.service';
import { AlertService } from '../../services/alert.service';
import { State } from '@clr/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'cm-contract',
  templateUrl: './contract.component.html',
  styles: []
})
export class ContractComponent implements OnInit {
  total: any;
  isSearch: boolean;
  contracts: any = [];
  perPage: any = 20;
  query: any;

  constructor(
    private contractService: ContractService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.getContractList();
  }

  async getContractList() {
    try {
      let rs: any = await this.contractService.getContractList(this.perPage, 0, this.query);
      if (rs.ok) {
        this.contracts = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(JSON.stringify(error));
    }
  }

  async refresh(state: State) {
    const offset = +state.page.from;
    const limit = +state.page.size;
    try {
      const rs = await this.contractService.getContractList(limit, offset, this.query);
      this.contracts = rs.rows;
      this.total = rs.total;
      // this.modalLoading.hide();
    } catch (error) {
      // this.modalLoading.hide();
      this.alertService.error(error.message);
    }
  }

  search() {
    if (this.query) {
      this.getContractList();
    }
  }

  enterSearch(event: any) {
    if (event.keyCode === 13) {
      this.search();
    }
  }

  onEditContract(contract: any) {
    let url = `/apps/${contract.contract_id}/edit`;
    this.router.navigateByUrl(url);
  }

}
