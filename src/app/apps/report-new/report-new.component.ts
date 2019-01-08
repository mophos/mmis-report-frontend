import { AlertService } from './../../services/alert.service';
import { ReportService } from './../../services/report.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-report-new',
  templateUrl: './report-new.component.html',
  styleUrls: ['./report-new.component.css']
})
export class ReportNewComponent implements OnInit {

  fileName: any;
  file: any;
  reportName: any;
  reportDetail: any;
  isParameter = true;
  parameterTypes = [];
  parameterType: any;
  parameterName: any;
  parameters = [];
  constructor(
    private reportService: ReportService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getParameterType();
  }

  fileChangeEvent(fileInput: any) {
    this.file = <Array<File>>fileInput.target.files;
    this.fileName = this.file[0].name;
  }

  switchParameter(e: any) {
    this.isParameter = e.target.checked;
  }

  async getParameterType() {
    try {
      const rs: any = await this.reportService.getParameterType();
      if (rs.ok) {
        this.parameterTypes = rs.rows;
        this.parameterType = rs.rows[0].parameter_id;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  addParameter() {
    const idx = _.findIndex(this.parameterTypes, { 'parameter_id': +this.parameterType });
    const obj = {
      parameter_name: this.parameterName,
      parameter_type: this.parameterType,
      parameter_type_name: this.parameterTypes[idx].parameter_name,
      parameter_type_detail: this.parameterTypes[idx].parameter_detail
    };
    this.parameters.push(obj);
    this.parameterName = null;
  }

  removeParameter(idx) {
    this.parameters.splice(idx, 1);
  }
}
