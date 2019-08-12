import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CommunicationService {

  constructor(private http: Http) { }

  get(userid) {
    console.log(userid);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get('/api/get/communication/' + userid, { headers: headers })
      .map(response => response);
  }

}
