import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Traveltip } from '../../travel';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss']
})
export class TravelComponent implements OnInit {
  traveltips: Traveltip[] = [];
  left: Traveltip[] = [];
  right: Traveltip[] = [];
  constructor(
    private http: Http,
    private global: GlobalService,
  ) { }

  add(tip) {
    const lsid = localStorage.getItem('id');
    let body = JSON.stringify({ userid: lsid, traveltipid: tip.id });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/api/add/travel', body, { headers: headers }).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        if (jsonDataBody.status) {

        }
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  delete(tip) {
    const lsid = localStorage.getItem('id');
    let body = JSON.stringify({ userid: lsid, traveltipid: tip.id });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/api/delete/travel', body, { headers: headers }).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        if (jsonDataBody.status) {

        }
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  update(tip) {
    if (tip.selected)
      this.add(tip)
    else
      this.delete(tip);
  }

  getAllTravelTips(): void {
    let headers = new Headers({ 'Content-Type': 'application/json' });

    this.http.get('/api/get/travel', { headers: headers }).subscribe(
      (jsonData) => {
        this.traveltips = [];
        let jsonDataBody = jsonData.json();
        for (let entry of jsonDataBody) {
          let r: Traveltip = {
            id: entry[0],
            name: entry[1],
            selected: false,
          };
          this.traveltips.push(r);
        };
        console.log(this.traveltips);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        const lsid = localStorage.getItem('id');
        this.http.get('/api/get/travel/' + lsid, { headers: headers }).subscribe(
          (jsonData) => {
            let jsonDataBody = jsonData.json();
            for (let entry of jsonDataBody) {
              for (let tip of this.traveltips) {
                if (entry[1] == tip.id) {
                  tip.selected = true;
                }
              }
            };
            console.log(this.traveltips);
            let len = this.traveltips.length;
            let mid = len / 2;

            this.left = this.traveltips.slice(0, mid);
            this.right = this.traveltips.slice(mid, len);
          },
          // The 2nd callback handles errors.
          (err) => console.error(err),
          // The 3rd callback handles the "complete" event.
          () => console.log("observable complete")
        );
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  ngOnInit() {
    this.getAllTravelTips();
  }

}
