import { Component, OnInit, NgZone, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy  } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/filter';
import { SigninService } from '../services/signin.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'nw-mailcontainer',
  templateUrl: './mailcontainer.component.html',
  styleUrls: ['./mailcontainer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MailcontainerComponent implements OnInit, OnDestroy  {
  public mailThreads = [];
  public searchResults = [];
  public showResults = true;
  public searchInput: string;
  public subscription: ISubscription;
  constructor(private signInService: SigninService,
              private router: Router,
              private ngZone: NgZone,
              private cdRef: ChangeDetectorRef) {


    //   this.router.events
    //   .filter(e => e instanceof NavigationEnd)
    //   .pairwise()
    //   .subscribe( (event) => {
    //     const navEnd = event[0];
    //     if (navEnd instanceof NavigationEnd ) {
    //       const prevURL = navEnd.url.includes('detail');
    //       if (prevURL) {
    //         const searchData = this.signInService.getLastSearchResult();
    //         console.log(searchData);
    //         setTimeout( () => {
    //           if (searchData) {
    //             // this.ngZone.run( () => {
    //               this.searchResults = searchData.data;
    //               this.searchInput = searchData.key;
    //              // this.cdRef.detectChanges();
    //             //});
    //           }
    //         }, 1000);
    //       }
    //     }
    // });
  }

  fetchUserEmails() {
    this.subscription = this.signInService.fetchUserMails()
      .subscribe( res => {
        this.mailThreads = res.threads;
      });
  }

  getSearchResults(searchKey) {
    if (searchKey) {
      this.subscription = this.signInService.getSearchResults(searchKey)
      .subscribe( res => {
          this.ngZone.run( () => {
            this.searchResults = res;
            this.showResults = res.length ? true : false;
          });
      });
    }
  }

  goToMailBody(msgId) {
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
    if (! this.signInService.getAuthCode()) { this.router.navigate(['']); }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
