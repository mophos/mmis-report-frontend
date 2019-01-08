import { AlertService } from './../../services/alert.service';
import { ReportService } from './../../services/report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cm-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reports = [];
  perPage = 30;
  constructor(
    private reportService: ReportService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getReports();
  }

  async getReports() {
    try {
      const rs: any = await this.reportService.getReports();
      if (rs.ok) {
        this.reports = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }
}
