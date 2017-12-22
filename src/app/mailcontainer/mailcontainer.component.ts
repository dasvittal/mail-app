import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SigninService } from '../services/signin.service';

@Component({
  selector: 'nw-mailcontainer',
  templateUrl: './mailcontainer.component.html',
  styleUrls: ['./mailcontainer.component.css']
})
export class MailcontainerComponent implements OnInit {
  public mailThreads = [];

  constructor(private signInService: SigninService,
              private router: Router) { }

  public fetchUserEmails() {
    this.signInService.fetchUserMails()
      .subscribe( res => {
        this.mailThreads = res.threads;
        // console.log(this.mailThreads);
      });

  }

  public getThreadBody(userId) {
    this.signInService.getThreadBody()
      .subscribe( res => {
          console.log(res);
      });
  }

  ngOnInit() {
    this.signInService.getAuthCode() ? setTimeout( () => this.fetchUserEmails(), 200) : this.router.navigate(['']);
  }

}
