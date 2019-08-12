import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatTableDataSource } from '@angular/material';
import { GlobalService } from '../../global.service';
import { Clothing } from '../../clothing';
import { Headers, Http } from '@angular/http';

@Component({
  selector: 'app-clothing',
  templateUrl: './clothing.component.html',
  styleUrls: ['./clothing.component.scss']
})
export class ClothingComponent implements OnInit {
  displayedColumns = ['type', 'quantity'];
  dataSource = new MatTableDataSource<Clothing>();
  clothings: Clothing[] = [];
  constructor(
    private http: Http,
    private global: GlobalService,
  ) { }

  update(id, qty) {
    const lsid = localStorage.getItem('id');
    let body = JSON.stringify({ userid: lsid, clothingbeddingid: id, quantity: qty });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/api/update/userclothingbedding', body, { headers: headers }).subscribe(
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

  ngOnInit() {
    let headers = new Headers({ 'Content-Type': 'application/json' });

    this.http.get('/api/get/clothingbedding', { headers: headers }).subscribe(
      (jsonData) => {
        this.clothings = [];
        let jsonDataBody = jsonData.json();
        for (let entry of jsonDataBody) {
          let r: Clothing = {
            id: entry[0],
            type: entry[1],
            quantity: 0
          };
          this.clothings.push(r);
        };
        let headers = new Headers({ 'Content-Type': 'application/json' });
        const lsid = localStorage.getItem('id');
        this.http.get('/api/get/clothingbedding/' + lsid, { headers: headers }).subscribe(
          (jsonData) => {
            let jsonDataBody = jsonData.json();
            for (let entry of jsonDataBody) {
              for (let clothing of this.clothings) {
                if (entry[1] == clothing.id) {
                  clothing.quantity = entry[2];
                }
              }
            };
            console.log(this.clothings);
            this.dataSource = new MatTableDataSource<Clothing>(this.clothings);
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


}
