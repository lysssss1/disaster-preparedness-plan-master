import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BasicService {

  constructor(private http: Http) { }

  add(basic) {
    console.log(basic);
    const body = JSON.stringify({ userid: basic.userid, location: basic.location , days: basic.days });
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post('/api/add/basic', body, { headers: headers })
      .map(response => response.json());
  }

  update(basic) {
    console.log(basic);
    const body = JSON.stringify({ userid: basic.userid, location: basic.location , days: basic.days });
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post('/api/update/basic', body, { headers: headers })
      .map(response => response.json());
  }

  get(userid) {
    console.log(userid);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get('/api/get/basic/' + userid, { headers: headers })
      .map(response => response);
  }
}
