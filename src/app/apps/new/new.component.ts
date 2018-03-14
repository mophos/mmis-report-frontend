import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IMyOptions } from 'mydatepicker-th';
import * as moment from 'moment';
import * as _ from 'lodash';

import { JwtHelper } from 'angular2-jwt';

// local dependencies
import { ContractService } from '../../services/contract.service';
import { AlertService } from '../../services/alert.service';
import { ContractStatus } from '../../interfaces/contract-status';
import { ContractType } from '../../interfaces/contract-type';
import { SelectUnitComponent } from '../../directives/select-unit/select-unit.component';
import { SearchProductComponent } from '../../directives/search-product/search-product.component';
import { BudgetType } from '../../interfaces/budget-type';
import { BidType } from '../../interfaces/bid-type';
import { SearchVendorsComponent } from '../../directives/search-vendors/search-vendors.component';
import { LoadingComponent } from '../../modals/loading/loading.component';

@Component({
  selector: 'cm-new',
  templateUrl: './new.component.html',
  styles: []
})
export class NewComponent implements OnInit {
  
  @ViewChild('selectUnit') selectUnit: SelectUnitComponent;
  @ViewChild('searchProduct') searchProduct: SearchProductComponent;
  @ViewChild('searchVendors') searchVendors: SearchVendorsComponent;
  @ViewChild('cmLoading') cmLoading: LoadingComponent;

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  contractId: any;
  isApproved: boolean = false;
  isSaving = false;
  loading = false;
  token: any = null;
  jwtHelper: JwtHelper = new JwtHelper();
  products: any = [];
  typeId: any = null;
  statusId: any = null;
  startDate: any;
  endDate: any;
  updatedDate: any;
  buyerName: any;
  buyerPosition: any;
  vendorId: any;
  prepareContactId: any;
  contactNo: any;
  totalPrice = 0;
  bidTypeId: any;
  bgTypeId: any;
  contractNo: any;
  prepareNo: any;

  selectedProductId: any;
  selectedGenericId: any;
  selectedCost: number = null;
  selectedUnitGenericId: any;
  selectedProductName: any;
  selectedQty: number = null;
  selectedConversionQty: number = null;
  selectedPrimaryUnitName: any = null;

  constructor(
    private contractService: ContractService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.token = sessionStorage.getItem('token');
    let decoded = this.jwtHelper.decodeToken(this.token);
    if (decoded.SYS_HOSPITAL) {
      let info = JSON.parse(decoded.SYS_HOSPITAL);
      this.buyerName = info.managerName;
      this.buyerPosition = `ผู้อำนวยการ${info.hospname}`
    }

    this.contractId = this.route.snapshot.params.contractId;
  }

  async ngOnInit() {
    const _currentDate = moment();

    this.startDate = {
      date: {
        year: _currentDate.get('year'),
        month: _currentDate.get('month') + 1,
        day: _currentDate.get('date')
      }
    };

    const _endDate = moment().add(60, 'days');

    this.endDate = {
      date: {
        year: _endDate.get('year'),
        month: _endDate.get('month') + 1,
        day: _endDate.get('date')
      }
    };

    if (this.contractId) {
      this.getContractDetail();
      this.getProductItems();
    }
  }

  async getProductItems() {
    this.cmLoading.show();
    try {
      let rs: any = await this.contractService.getProductItems(this.contractId);
      this.cmLoading.hide();
      if (rs.ok) {
        rs.rows.forEach(v => {
          let obj: any = {};
          obj.product_id = v.product_id;
          obj.generic_id = v.generic_id;
          obj.product_name = v.product_name;
          obj.unit_generic_id = v.unit_generic_id;
          obj.cost = v.cost;
          obj.qty = v.qty;
          obj.conversion_qty = v.conversion_qty;
          obj.primary_unit_name = v.to_unit_name;

          this.products.push(obj);
        });
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.cmLoading.hide();
      this.alertService.error(JSON.stringify(error));
    }
  }

  async getContractDetail() {
    this.cmLoading.show();
    try {
      let rs: any = await this.contractService.getContractDetail(this.contractId);
      this.cmLoading.hide();
      if (rs.detail) {
        let detail = rs.detail;
        this.contractNo = detail.contract_no;
        this.buyerName = detail.buyer_name;
        this.buyerPosition = detail.buyer_position;
        this.bidTypeId = detail.bid_type_id;
        this.bgTypeId = detail.bgtype_id;
        this.vendorId = detail.labeler_id;
        this.searchVendors.setDefault(detail.labeler_name);
        this.prepareNo = detail.prepare_no;
        this.statusId = detail.status_id;
        this.startDate = moment(detail.start_date).isValid() ? {
          date: {
            year: moment(detail.start_date).get('year'),
            month: moment(detail.start_date).get('month') + 1,
            day: moment(detail.start_date).get('date'),
          }
        } : {
            date: {
              year: moment().get('year'),
              month: moment().get('month') + 1,
              day: moment().get('date')
            }  
        };
        this.endDate = moment(detail.end_date).isValid() ? {
          date: {
            year: moment(detail.end_date).get('year'),
            month: moment(detail.end_date).get('month') + 1,
            day: moment(detail.end_date).get('date'),
          }
        } : {
            date: {
              year: moment().add(1, 'm').get('year'),
              month: moment().add(1, 'm').get('month') + 1,
              day: moment().add(1, 'm').get('date')
            }  
          };
        
        this.updatedDate = detail.last_updated;

      } else {
        this.alertService.error('ไม่พบรายละเอียดการทำสัญญา');
      }
    } catch (error) {
      this.cmLoading.hide();
      this.alertService.error(JSON.stringify(error))
    }
  }

  onChangeStatus(event: ContractStatus) {
    if (event) {
      this.statusId = event ? event.status_id : null;
    }
  }

  onChangeTypes(event: ContractType) {
    if (event) {
      this.typeId = event ? event.type_id : null;
    }
  }

  onSelectVendor(event: any) {
    this.vendorId = event ? event.labeler_id : null;
  }

  onChangeVendor(event: boolean) {
    if (event) {
      this.vendorId = null;
    }
  }

  onSelecteProduct(event: any) {
    this.selectedGenericId = event ? event.generic_id : null;
    this.selectedProductId = event ? event.product_id : null;
    this.selectedProductName = event ? event.product_name : null;
    this.selectUnit.getUnits(this.selectedGenericId);
  }

  onChangeUnit(event: any) {
    this.selectedCost = event ? +event.cost : null;
    this.selectedUnitGenericId = event ? event.unit_generic_id : null;
    this.selectedConversionQty = event ? +event.qty : null;
    this.selectedPrimaryUnitName = event ? event.to_unit_name : null;
  }

  addProduct() {
    if (this.selectedCost && this.selectedProductId && this.selectedUnitGenericId && this.selectedQty) {
      let obj: any = {};
      obj.product_id = this.selectedProductId;
      obj.generic_id = this.selectedGenericId;
      obj.product_name = this.selectedProductName;
      obj.unit_generic_id = this.selectedUnitGenericId;
      obj.cost = this.selectedCost;
      obj.qty = this.selectedQty;
      obj.conversion_qty = this.selectedConversionQty;
      obj.primary_unit_name = this.selectedPrimaryUnitName;
      
      let _idx = _.findIndex(this.products, { product_id: this.selectedProductId });
      if (_idx > -1) {
        this.alertService.error('มีรายการสินค้านี้อยู่แล้ว');
      } else {
        this.products.push(obj);
        this.countTotal();
        this.clearForm();
      }
    } else {
      this.alertService.error('กรุณาระบุข้อมูลให้ครบถ้วน')
    }
  }

  onChangeEditUnit(event: any, product: any) {
    let idx = _.findIndex(this.products, { product_id: product.product_id });
    if (idx > -1) {
      this.products[idx].unit_generic_id = event ? event.unit_generic_id : null;
      // this.products[idx].cost = event ? event.cost : 0;
      this.products[idx].conversion_qty = event ? event.qty : 0;

      this.countTotal();
    }
  }

  onChangeEditQty(qty: any, product: any) {
    let idx = _.findIndex(this.products, { product_id: product.product_id });
    if (idx > -1) {
      this.products[idx].qty = +qty;
      this.countTotal();
    }
  }

  onChangeEditCost(cost: any, product: any) {
    let idx = _.findIndex(this.products, { product_id: product.product_id });
    if (idx > -1) {
      this.products[idx].cost = +cost;
      this.countTotal();
    }
  }

  removeProduct(product: any) {
    this.alertService.confirm('ต้องการลบรายการนี้ ใช่หรือไม่?')
      .then(() => {
        let idx = _.findIndex(this.products, { product_id: product.product_id });
        if (idx > -1) {
          this.products.splice(idx, 1);
          this.countTotal();
        }
      })
      .catch(() => {  });
  }

  clearForm() {
    this.selectedCost = null;
    this.selectedGenericId = null;
    this.selectedProductId = null;
    this.selectedProductName = null;
    this.selectedQty = null;
    this.selectedUnitGenericId = null;
    this.selectedPrimaryUnitName = null;
    this.selectedConversionQty = 0;

    this.selectUnit.clearUnits();
    this.searchProduct.clearProductSearch();
  }

  onChangeBgType(event: BudgetType) {
    this.bgTypeId = event ? event.bgtype_id : null;
  }

  onChangeBidType(event: BidType) {
    this.bidTypeId = event ? event.bid_id : null;
  }

  countTotal() {
    this.totalPrice = 0;
    this.products.forEach(v => {
      this.totalPrice += (v.cost * v.qty);
    });
  }

  // save contract
  saveContract() {
    if (this.bidTypeId && this.bgTypeId && this.buyerName && this.buyerPosition
      && this.startDate && this.endDate && this.vendorId && this.products.length) {
      this.alertService.confirm('ต้องการบันทึกข้อมูล ใช่หรือไม่?')
        .then(async () => {
          try {
            this.loading = true;
            this.cmLoading.show();
            let contract: any = {};
            contract.startDate = this.startDate ?
              `${this.startDate.date.year}-${this.startDate.date.month}-${this.startDate.date.day}` : null;
            contract.endDate = this.endDate ?
              `${this.endDate.date.year}-${this.endDate.date.month}-${this.endDate.date.day}` : null;
            
            contract.bidTypeId = this.bidTypeId;
            contract.bgTypeId = this.bgTypeId;
            contract.vendorId = this.vendorId;

            contract.contractNo = this.contractNo;
            contract.buyerName = this.buyerName;
            contract.buyerPosition = this.buyerPosition;
            contract.isApproved = this.isApproved ? 'Y' : 'N';

            let isSuccess = true;

            if (this.isApproved && this.contractNo) {
              isSuccess = true;
            } else if (this.isApproved && !this.contractNo) {
              this.alertService.error('กรุณาระบุเลขที่สัญญา');
              isSuccess = false;
            } else {
              isSuccess = true;
            }

            if (isSuccess) {
              let rs: any;
              if (this.contractId) {
                rs = await this.contractService.updateContract(this.contractId, contract, this.products);
              } else {
                rs = await this.contractService.saveContract(contract, this.products);
              }

              if (rs.ok) {
                this.router.navigate(['/apps/contracts']);
              } else {
                this.alertService.error(rs.error);
              }
            }
            
            this.loading = false;
            this.cmLoading.hide();

          } catch (error) {
            this.loading = false;
            this.cmLoading.hide();
            this.alertService.error(JSON.stringify(error));
          }
        }).catch(() => { this.loading = false; });
    } else {
      this.loading = false;
      this.alertService.error('กรุณาระบุข้อมูลให้ครบถ้วน');
    }
  }

  cancelContract(contract: any) {
    this.alertService.confirm(`ต้องการยกเลิกสัญญา เลขที่เตรียม ${this.prepareNo} ใช่หรือไม่?`)
      .then(async () => {
        this.cmLoading.show();
        try {
          let rs: any = await this.contractService.cancelContract(this.contractId);
          this.cmLoading.hide();
          if (rs.ok) {
            this.router.navigate(['/apps/contracts']);
          } else {
            this.alertService.error(rs.error);
          }
        } catch (error) {
          this.cmLoading.hide();
          this.alertService.error(JSON.stringify(error));
        }
      }).catch(() => { });
  }
}
