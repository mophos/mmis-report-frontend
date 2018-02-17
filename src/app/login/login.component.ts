import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cm-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;
  isLogging: boolean = false;
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  enterLogin(event: any) {

  }

  doLogin() {
    this.router.navigate(['/apps']);
  }
}
