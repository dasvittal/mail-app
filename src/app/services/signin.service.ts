import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class SigninService {

  public authCode: string;

  constructor(private http: Http) { }

  public fetchUserMails(): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return this.http.post('/getMails', JSON.stringify({ code : this.authCode}), options)
      .map( ( res: Response) => {
        return res.json();
      })
      .catch( (err: Response) => { console.log(err); throw err; });
  }


  public setAuthCode(code: string) {
      this.authCode = code;
  }
}
