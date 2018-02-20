import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ContractService {

  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }

  async saveContract(contract: any, items: any[]) {
    let rs: any = await this.authHttp.post(`${this.url}/contracts`, {
      items: items,
      contract: contract
    }).toPromise();
    return rs.json();
  }

  async updateContract(contractId: any, contract: any, items: any[]) {
    let rs: any = await this.authHttp.put(`${this.url}/contracts/${contractId}/edit`, {
      items: items,
      contract: contract
    }).toPromise();
    return rs.json();
  }

  async getContractList(limit: number, offset: number, query: any, status: any) {
    let rs: any = await this.authHttp.get(`${this.url}/contracts?limit=${limit}&offset=${offset}&query=${query}&status=${status}`).toPromise();
    return rs.json();
  }

  async getProductItems(contractId: any) {
    let rs: any = await this.authHttp.get(`${this.url}/contracts/products/items/${contractId}`).toPromise();
    return rs.json();
  }

  async getContractDetail(contractId: any) {
    let rs: any = await this.authHttp.get(`${this.url}/contracts/detail/${contractId}`).toPromise();
    return rs.json();
  }

  async cancelContract(contractId: any) {
    let rs: any = await this.authHttp.delete(`${this.url}/contracts/${contractId}/cancel`).toPromise();
    return rs.json();
  }

  async approveContract(contractId: any) {
    let rs: any = await this.authHttp.put(`${this.url}/contracts/${contractId}/approved`, {}).toPromise();
    return rs.json();
  }
}
