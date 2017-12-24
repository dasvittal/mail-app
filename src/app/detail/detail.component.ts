import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { SigninService } from '../services/signin.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'nw-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  private subscription : ISubscription;
  private messageId: string;
  public mailBody: any;
  public mailDetails = {
    from : '',
    date: '',
    subject: '',
    to: ''
  };

  constructor(private route: ActivatedRoute,
              private signInService: SigninService) { }

  public getMessageBody() {
      this.subscription = this.signInService.getThreadBody(this.messageId)
          .subscribe( res => {
              if (res) {
                if (res.payload.body.size) {
                  this.mailBody = this.base64DecodeUrl(res.payload.body.data);
                } else if (res.payload.parts && res.payload.parts[0].body.size) {
                  this.mailBody = '<pre>' + this.base64DecodeUrl(res.payload.parts[0].body.data) + '</pre>';
                } else {
                  this.mailBody = res.snippet;
                }
                this.extractMailDeatils(res.payload.headers);
              }
          });
  }

  base64DecodeUrl(str) {
    str = (str + '===').slice(0, str.length + (str.length % 4));
    return window.atob(str.replace(/-/g, '+').replace(/_/g, '/'));
  }

  extractMailDeatils(headers) {
    if (Array.isArray(headers)) {
      headers.forEach( (header) => {
          switch (header.name) {
            case 'Date' : { this.mailDetails.date = header.value; break; }
            case 'Subject' : { this.mailDetails.subject = header.value; break; }
            case 'From' : { this.mailDetails.from = header.value; break; }
            case 'To' : { this.mailDetails.to = header.value; break; }
          }
      });
    }
  }

  sendAsSMS() {
    this.subscription = this.signInService.sendSMSUser(this.mailDetails.subject)
        .subscribe( res => {
            console.log(res);
        });
  }

  ngOnInit() {
      this.route.params.subscribe( param => {
          this.messageId = param['id'];
          this.getMessageBody();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
