import { Component, OnInit, Inject } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'cm-layout',
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent implements OnInit {

  collapsible: boolean = true;
  collapse: boolean = true;
  fullname: string;

  jwtHelper: JwtHelper = new JwtHelper();
  token: any;

  constructor(
    private router: Router,
    @Inject('HOME_URL') private homeUrl: string
  ) { }

  ngOnInit() {
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }


}
