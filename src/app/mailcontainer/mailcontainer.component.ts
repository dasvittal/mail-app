import { Component, OnInit } from '@angular/core';

import { SigninService } from '../services/signin.service';

@Component({
  selector: 'nw-mailcontainer',
  templateUrl: './mailcontainer.component.html',
  styleUrls: ['./mailcontainer.component.css']
})
export class MailcontainerComponent implements OnInit {
  public mailThreads = [];

  constructor(private signInService: SigninService) { }

  public fetchUserEmails() {
    this.signInService.fetchUserMails()
      .subscribe( res => {
        this.mailThreads = res.threads;
        console.log(this.mailThreads);
      });

  }
  ngOnInit() {
    setTimeout( () => this.fetchUserEmails(), 200);
  }

}
