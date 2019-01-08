import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ReportService {

  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }

  async getReports() {
    const rs: any = await this.authHttp.get(`${this.url}/reports`)
      .toPromise();
    return rs.json();
  }

  async getParameterType() {
    const rs: any = await this.authHttp.get(`${this.url}/reports/parameter`)
      .toPromise();
    return rs.json();
  }
}
