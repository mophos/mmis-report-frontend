import { AlertService } from './../../services/alert.service';
import { ReportService } from './../../services/report.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { Router } from '@angular/router';
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
  isParameter = false;
  parameterTypes = [];
  parameterType: any;
  parameterName: any;
  parameters = [];
  @ViewChild('modalLoading') public modalLoading: any;
  constructor(
    private reportService: ReportService,
    private alertService: AlertService,
    private router: Router
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

  removeParameter(idx: any) {
    this.parameters.splice(idx, 1);
  }

  async save() {
    try {
      this.modalLoading.show();
      const header = {
        report_name: this.reportName,
        report_detail: this.reportDetail,
        is_parameter: this.isParameter ? 'Y' : 'N'
      };
      const detail = [];
      const rs: any = await this.reportService.saveHeader(header);
      if (rs.ok) {
        const reportId = rs.rows[0];
        for (const p of this.parameters) {
          const obj = {
            report_id: reportId,
            parameter_name: p.parameter_name,
            parameter_type: +p.parameter_type
          };
          detail.push(obj);
        }
        await this.reportService.saveDetail(detail);
        await this.reportService.uploadFile(reportId, this.file);
        this.modalLoading.hide();
        this.alertService.success();
        this.router.navigate(['/apps/reports']);
      } else {
        this.modalLoading.hide();
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.modalLoading.hide();
      this.alertService.error(error);
    }
  }


}
