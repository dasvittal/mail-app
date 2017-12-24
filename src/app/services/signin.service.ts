import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class SigninService {

  constructor(private http: Http) { }

  public fetchUserMails(): Observable<any> {
    return this.http.post('/mails', JSON.stringify({ code : this.getAuthCode()}), this.getHeaders() )
      .map( ( res: Response) => {
        return res.json();
      })
      .catch( (err: Response) => { console.log(err); throw err; });
  }

  public getThreadBody(messageId): Observable<any> {
    return this.http.post('/mail/body/' + messageId , JSON.stringify({code : this.getAuthCode()}), this.getHeaders())
      .map( ( res: Response) => {
        return res.json();
      })
      .catch( (err: Response) => { console.log(err); throw err; });
  }

  public getSearchResults(searchKey): Observable<any> {
    return this.http.get('/mails/' + searchKey , this.getHeaders())
      .map( ( res: Response) => {
        return res.json();
      })
      .catch( (err: Response) => { console.log(err); throw err; });
  }

  sendSMSUser(msg): Observable<any> {
    return this.http.post('/sms',  JSON.stringify({ msg : msg}), this.getHeaders())
        .map( (res: Response) => {
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

  public storeLastSearchResult(key, data): void {
    const searchData = { key: key, data: data};
    localStorage.setItem('SEARCH_DATA', JSON.stringify(searchData));
  }
  public getLastSearchResult() {
    return JSON.parse(localStorage.getItem('SEARCH_DATA'));
  }
  public setAuthCode(code: string): void {
      sessionStorage.setItem('AUTH_CODE', code);
  }
  public getAuthCode(): string {
    return sessionStorage.getItem('AUTH_CODE');
  }
}
