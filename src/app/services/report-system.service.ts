import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReportSystemService {

  token: any;
  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) {
    this.token = sessionStorage.getItem('token');
  }

  async getReports() {
    const rs: any = await this.authHttp.get(`${this.url}/report-system`)
      .toPromise();
    return rs.json();
  }

  async getInfo(reportId) {
    const rs: any = await this.authHttp.get(`${this.url}/report-system/info?reportId=${reportId}`)
      .toPromise();
    return rs.json();
  }

  async remove(reportId) {
    const rs: any = await this.authHttp.delete(`${this.url}/report-system?reportId=${reportId}`)
      .toPromise();
    return rs.json();
  }

  async getParameterType() {
    const rs: any = await this.authHttp.get(`${this.url}/report-system/parameter`)
      .toPromise();
    return rs.json();
  }

  async saveHeader(header) {
    const rs: any = await this.authHttp.post(`${this.url}/report-system/header`, {
      header: header
    })
      .toPromise();
    return rs.json();
  }
  async saveDetail(detail) {
    const rs: any = await this.authHttp.post(`${this.url}/report-system/detail`, {
      detail: detail
    })
      .toPromise();
    return rs.json();
  }

  // async uploadFile(reportId, files:) {
  //   const rs: any = await this.authHttp.post(`${this.url}/uploads`, {
  //     reportId: reportId,
  //     files: files
  //   })
  //     .toPromise();
  //   return rs.json();
  // }

  uploadFile(reportId: string, files: Array<File>) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();
      for (let i = 0; i < files.length; i++) {
        formData.append('files[]', files[i]);
      }
      formData.append('reportId', reportId);
      formData.append('token', this.token);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      const url = `${this.url}/uploads?token=${this.token}`;
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }
}
