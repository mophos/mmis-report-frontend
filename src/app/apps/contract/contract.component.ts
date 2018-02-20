import { Component, OnInit, ViewChild } from '@angular/core';
import { ContractService } from '../../services/contract.service';
import { AlertService } from '../../services/alert.service';
import { State } from '@clr/angular';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../modals/loading/loading.component';

@Component({
  selector: 'cm-contract',
  templateUrl: './contract.component.html',
  styles: []
})
export class ContractComponent implements OnInit {
  
  @ViewChild('cmLoading') private cmLoading: LoadingComponent;
  
  total: any;
  isSearch: boolean;
  contracts: any = [];
  perPage: any = 20;
  query: any;
  statusCode: any = 'ALL';

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
      this.cmLoading.show();
      let rs: any = await this.contractService.getContractList(this.perPage, 0, this.query, this.statusCode);
      this.cmLoading.hide();
      if (rs.ok) {
        this.contracts = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.cmLoading.hide();
      this.alertService.error(JSON.stringify(error));
    }
  }

  async refresh(state: State) {
    const offset = +state.page.from;
    const limit = +state.page.size;
    this.cmLoading.show();
    try {
      const rs = await this.contractService.getContractList(limit, offset, this.query, this.statusCode);
      this.contracts = rs.rows;
      this.total = rs.total;
      this.cmLoading.hide();
    } catch (error) {
      this.cmLoading.hide();
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
    let url = `/apps/contracts/${contract.contract_id}/edit`;
    this.router.navigateByUrl(url);
  }

  toggleStatus(status: any) {
    this.statusCode = status;
    this.getContractList();
  }

  cancelContract(contract: any) {
    this.alertService.confirm(`ต้องการยกเลิกสัญญา เลขที่เตรียม ${contract.prepare_no} ใช่หรือไม่?`)
      .then(async () => {
        this.cmLoading.show();
        try {
          let rs: any = await this.contractService.cancelContract(contract.contract_id);
          this.cmLoading.hide();
          if (rs.ok) {
            this.getContractList();
          } else {
            this.alertService.error(rs.error);
          }
        } catch (error) {
          this.cmLoading.hide();
          this.alertService.error(JSON.stringify(error));
        }
      }).catch(() => { });
  }

  approveContract(contract: any) {
    if (contract.contract_no) {
      this.alertService.confirm(`ต้องการอนมัติสัญญา เลขที่เตรียม ${contract.prepare_no} ใช่หรือไม่?`)
        .then(async () => {
          this.cmLoading.show();
          try {
            let rs: any = await this.contractService.approveContract(contract.contract_id);
            this.cmLoading.hide();
            if (rs.ok) {
              this.getContractList();
            } else {
              this.alertService.error(rs.error);
            }
          } catch (error) {
            this.cmLoading.hide();
            this.alertService.error(JSON.stringify(error));
          }
        }).catch(() => { });
    } else {
      this.alertService.error('กรุณาระบุเลขที่สัญญา');
    }
    
  }

}
