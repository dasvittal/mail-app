import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'nw-mailbody',
  template: '<div [innerHTML]="mailBody"></div>'
})
export class MailbodyComponent implements OnInit {

  @Input() parsedBody: string;
  public mailBody: any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.mailBody = this.sanitizer.bypassSecurityTrustHtml(this.parsedBody);
   }

}
