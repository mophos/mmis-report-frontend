import { AlertService } from './../../services/alert.service';
import { ReportService } from './../../services/report.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
@Component({
  selector: 'app-report-parameter',
  templateUrl: './report-parameter.component.html',
  styles: []
})
export class ReportParameterComponent implements OnInit {

  reportId: any;
  reportName: any;
  parameters: any = [];
  token: any;
  @ViewChild('htmlPreview') public htmlPreview: any;
  @ViewChild('modalLoading') public modalLoading: any;

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    private alertService: AlertService,
    @Inject('API_URL') private apiUrl: string
  ) {
    this.token = sessionStorage.getItem('token');
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.reportId = params.reportId;
      this.getInfo();
    });
  }
  async getInfo() {
    try {
      const rs: any = await this.reportService.getInfo(this.reportId);
      if (rs.ok) {
        this.reportName = rs.rows[0].report_name;
        this.parameters = rs.rows;
      }
    } catch (error) {

    }
  }

  onChange(e: any) {
    const idx = _.findIndex(this.parameters, { 'report_detail_id': e.reportDetailId });
    if (idx > -1) {
      this.parameters[idx].value = e.value;
    }
  }

  preview() {
    console.log('preview');

    const length = this.parameters.length;
    let url: any;
    url = `${this.apiUrl}/reports/preview?reportId=${this.parameters[0].report_id}&length=${length}`;
    if (length >= 1) {
      url += `&p1_name=${this.parameters[0].parameter_name}&p1_value=${this.parameters[0].value}`;
    }
    if (length >= 2) {
      url += `&p2_name=${this.parameters[1].parameter_name}&p2_value=${this.parameters[1].value}`;
    }
    if (length >= 3) {
      url += `&p3_name=${this.parameters[2].parameter_name}&p3_value=${this.parameters[2].value}`;
    }
    if (length >= 4) {
      url += `&p4_name=${this.parameters[3].parameter_name}&p4_value=${this.parameters[3].value}`;
    }
    if (length >= 5) {
      url += `&p5_name=${this.parameters[4].parameter_name}&p5_value=${this.parameters[4].value}`;
    }
    url += `&token=${this.token}`;
    this.htmlPreview.showReport(url, 'landscape');
  }

}
