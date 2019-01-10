import { AlertService } from './../../services/alert.service';
import { ReportService } from './../../services/report.service';
import { Component, OnInit } from '@angular/core';
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
  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.reportId = params.reportId;
      this.getInfo();
    });
    console.log(this.reportId);

  }
  async getInfo() {
    try {
      const rs: any = await this.reportService.getInfo(this.reportId);
      if (rs.ok) {
        this.reportName = rs.rows[0].report_name;
        this.parameters = rs.rows;
        console.log(this.parameters);

      }
    } catch (error) {

    }
  }

  onChange(e: any) {
    const idx = _.findIndex(this.parameters, { 'report_detail_id': e.reportDetailId });
    if (idx > -1) {
      this.parameters[idx].value = e.value;
    }
    console.log(this.parameters);


  }

}
