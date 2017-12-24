import { Component, OnInit, NgZone } from '@angular/core';
import { Router, NavigationEnd, Event, RouterStateSnapshot  } from '@angular/router';
import 'rxjs/add/operator/pairwise';

import 'rxjs/add/operator/filter';
import { SigninService } from '../services/signin.service';

@Component({
  selector: 'nw-mailcontainer',
  templateUrl: './mailcontainer.component.html',
  styleUrls: ['./mailcontainer.component.css']
})
export class MailcontainerComponent implements OnInit {
  public mailThreads = [];
  public searchResults = [];
  public showResults = true;
  public searchInput: string;
  public count = 0;
  constructor(private signInService: SigninService,
              private router: Router,
              private ngZone: NgZone) {
    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .pairwise()
      .subscribe( (event) => {
        let navEvent = event[0];
        if (navEvent instanceof NavigationEnd ) {
         const prevURL = navEvent.url.includes('detail');
          if (prevURL) {
            const searchData = this.signInService.getLastSearchResult();
            if (searchData) {
              // this.ngZone.run( () => {
                this.searchResults = searchData.data;
                this.searchInput = searchData.key;
              // });
            }
          }
        }
    });
  }

  public fetchUserEmails() {
    this.signInService.fetchUserMails()
      .subscribe( res => {
        this.mailThreads = res.threads;
      });
  }

  public getSearchResults(searchKey) {
    if (searchKey) {
      this.signInService.getSearchResults(searchKey)
      .subscribe( res => {
          this.ngZone.run( () => {
            this.searchResults = res;
            this.showResults = res.length ? true : false;
          });
      });
    }
  }

  public goToMailBody(msgId) {
    this.signInService.storeLastSearchResult(this.searchInput , this.searchResults);
    this.router.navigate(['/detail', msgId]);
  }

  // public getThreadBody(messageId) {
  //   this.signInService.getThreadBody(messageId)
  //     .subscribe( res => {
  //         console.log(res.length);
  //     });
  // }

  ngOnInit() {
    this.signInService.getAuthCode() ? setTimeout( () => this.fetchUserEmails(), 200) : this.router.navigate(['']);
  }

}
