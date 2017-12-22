import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { SigninService } from '../services/signin.service';

declare const gapi: any;

@Component({
  selector: 'nw-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements  AfterViewInit  {

  private clientId = '651858061774-i0qb3g5sifrbvtiifg5956et0ocj64jh.apps.googleusercontent.com';
  public auth2: any;
  public showSignInBtn = false;

  constructor(private signInService: SigninService,
              private router: Router) { }

  public googleInit() {
    const scopes = [
      'email',
      'profile',
      'https://mail.google.com/',
      'https://www.googleapis.com/auth/gmail.modify',
      'https://www.googleapis.com/auth/gmail.readonly'
    ].join(' ');

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: 'single_host_origin',
        scope : scopes
      });
    });
    this.showSignInBtn = true;
  }

  public googleSignIn() {

    if (this.auth2) {
      this.auth2.grantOfflineAccess()
      .then( (res) => {
        if (res.code) {
          this.signInService.setAuthCode(res.code);
          this.router.navigate(['./emails']);
        }
      });
    }
  }
  // public autherizeToken(code) {
  //   this.signInService.fetchUserMails(code)
  //     .subscribe( res => {
  //       console.log(res);
  //     });
  // }

  ngAfterViewInit() {
    setTimeout(() => this.googleInit(), 1000);
  }

}
