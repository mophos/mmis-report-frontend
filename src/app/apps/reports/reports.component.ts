import { AlertService } from './../../services/alert.service';
import { ReportService } from './../../services/report.service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import * as _ from 'lodash';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  token: any;
  reports = [];
  perPage = 30;
  @ViewChild('htmlPreview') public htmlPreview: any;
  @ViewChild('modalLoading') public modalLoading: any;
  constructor(
    private reportService: ReportService,
    private alertService: AlertService,
    private router: Router,
    @Inject('API_URL') private apiUrl: string,
  ) {
    this.token = sessionStorage.getItem('token');
  }

  ngOnInit() {
    this.getReports();
  }

  async getReports() {
    try {
      this.modalLoading.show();
      const rs: any = await this.reportService.getReports();
      this.modalLoading.hide();
      if (rs.ok) {
        this.reports = rs.rows;
      } else {
        this.modalLoading.hide();
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.modalLoading.hide();
      this.alertService.error(error);
    }
  }

  async remove(report) {
    try {
      this.alertService.confirm(`คุณต้องการที่จะลบ ${report.report_name}ใช่หรือไม่?`)
        .then(async (result) => {
          this.modalLoading.show();
          await this.reportService.remove(report.report_id);
          const idx = _.findIndex(this.reports, { 'report_id': report.report_id });
          this.reports.splice(idx, 1);
          this.modalLoading.hide();
        }).catch((err) => {

        });

    } catch (error) {
      this.modalLoading.hide();
      this.alertService.error(error);
    }
  }

  print(r: any) {
    if (r.is_parameter === 'N') {
      const url = `${this.apiUrl}/reports/preview?reportId=${r.report_id}&token=${this.token}`;
      this.htmlPreview.showReport(url, 'landscape');
    } else {
      this.router.navigate(['/apps/report-parameter'], { queryParams: { reportId: r.report_id } });
    }
  }

}
