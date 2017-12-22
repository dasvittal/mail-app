import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class SigninService {

  private authCode: string;

  constructor(private http: Http) { }

  public fetchUserMails(): Observable<any> {
    return this.http.get('/getMails', this.getURLParams({code : this.authCode}, this.getHeaders()))
      .map( ( res: Response) => {
        return res.json();
      })
      .catch( (err: Response) => { console.log(err); throw err; });
  }

  public getThreadBody(): Observable<any> {
    return this.http.get('/getMailBody',  this.getURLParams({code : this.authCode}, this.getHeaders()))
      .map( ( res: Response) => {
        return res.json();
      })
      .catch( (err: Response) => { console.log(err); throw err; });
  }

  public getHeaders(): RequestOptions {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new RequestOptions({ headers: headers });
  }

  public getURLParams(query: any, options: RequestOptions): any {
    const params: URLSearchParams = new URLSearchParams();
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        params.set(key.toString(), query[key]);
      }
    }
    return options ? options.search = params : params;
  }

  public setAuthCode(code: string): void {
      this.authCode = code;
  }
  public getAuthCode(): string {
    return this.authCode;
  }
}
