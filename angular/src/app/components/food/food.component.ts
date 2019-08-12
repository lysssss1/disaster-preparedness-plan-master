import { ViewChild, Component, ElementRef, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { MatTableDataSource } from '@angular/material';
import { Food } from '../../food';
import { HumanService } from '../../services/human.service';
import { PetService } from '../../services/pet.service';
import { BasicService } from '../../services/basic.service';
import 'rxjs/add/operator/map';

import * as Chart from 'chart.js';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  @ViewChild('donut') donut: ElementRef;
  displayedColumns = ['type', 'calories', 'quantity', 'total'];
  dataSource = new MatTableDataSource<Food>();
  foods: Food[] = [];
  calories: number[] = [];
  labels: string[] = [];
  finishhttp: boolean = false;
  total: number;
  background: string[] = [];

  pet: number;
  need: number;

  days: number;

  chart: any;

  constructor(
    private http: Http,
    private humanS: HumanService,
    private petS: PetService,
    private basic: BasicService
  ) { }

  update(id, qty) {
    const lsid = localStorage.getItem('id');
    let body = JSON.stringify({ userid: lsid, foodid: id, quantity: qty });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/api/update/userfood', body, { headers: headers }).subscribe(
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

    id = id - 1;
    this.foods[id].quantity = qty;
    this.calories[id] = qty * this.foods[id].calories;
    this.total = 0;
    for (let t of this.calories) {
      this.total = this.total + t;
    }
    let donutCtx = this.donut.nativeElement.getContext('2d');

    var data = {
      labels: this.labels,
      datasets: [
        {
          "data": this.calories,   // Example data
          "backgroundColor": this.background
        }]
    };

    this.chart.data = data;
    this.chart.update();
  }

  cal_need() {
    this.need = 0;
    this.pet = 0;
    const lsid = localStorage.getItem('id');
    this.humanS.get(lsid).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        for (let entry of jsonDataBody) {
          if (entry[4] == 'male')
            this.need = this.need + 2500;
          else if (entry[4] == 'female')
            this.need = this.need + 2000;
        };
        this.need = this.need * this.days;
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );

    this.petS.get(lsid).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        for (let entry of jsonDataBody) {
          this.pet = this.pet + entry[4] * 0.33;
        };
        this.pet = this.pet * this.days;
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  init_chart() {
    this.total = 0;
    this.background = [];
    this.background.push("#e1e1e1");
    this.background.push("#fdf18b");
    this.background.push("#dee7ab");
    this.background.push("#bad9b2");
    this.background.push("#84c4b6");
    this.background.push("#6bb7d1");
    this.background.push("#84acd1");
    this.background.push("#a2a6d5");
    this.background.push("#ce9ec6");
    this.background.push("#eba6ad");
    this.background.push("#f8aa9e");
    this.background.push("#f3a27a");
    this.background.push("#ffd89d");
    this.background.push("#ffffff");
    let headers = new Headers({ 'Content-Type': 'application/json' });

    this.http.get('/api/get/food', { headers: headers }).subscribe(
      (jsonData) => {
        this.foods = [];
        this.labels = [];
        let jsonDataBody = jsonData.json();
        for (let entry of jsonDataBody) {
          let r: Food = {
            id: entry[0],
            type: entry[1],
            servings: entry[2],
            calories: entry[3],
            quantity: 0
          };
          this.foods.push(r);
          this.labels.push(r.type);
          this.calories.push(0);
          //this.labels.push(r.type);
          //this.calories.push(10); //update
        };
        //console.log(this.foods);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        const lsid = localStorage.getItem('id');
        this.http.get('/api/get/food/' + lsid, { headers: headers }).subscribe(
          (jsonData) => {
            let jsonDataBody = jsonData.json();
            for (let entry of jsonDataBody) {
              for (let food of this.foods) {
                if (entry[1] == food.id) {
                  food.quantity = entry[2];
                  this.calories[food.id - 1] = food.quantity * food.calories;
                  this.total = this.total + food.quantity * food.calories;
                }
              }
            };
            console.log(this.foods);
            this.dataSource = new MatTableDataSource<Food>(this.foods);

            let donutCtx = this.donut.nativeElement.getContext('2d');

            var data = {
              labels: this.labels,
              datasets: [
                {
                  "data": this.calories,   // Example data
                  "backgroundColor": this.background
                }]
            };

            this.chart = new Chart(
              donutCtx,
              {
                "type": 'doughnut',
                "data": data,
                "options": {
                  "legend": {
                    "display": false,
                    "position": 'bottom'
                  },
                  "scaleShowLabels": false,
                  "responsive": false,
                  "maintainAspectRatio": false,
                  "cutoutPercentage": 50,
                  "animation": {
                    "animateScale": true,
                    "animateRotate": false
                  }
                }
              }
            );
            this.finishhttp = true;
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

  getBasic() {
    const lsid = localStorage.getItem('id');
    this.basic.get(lsid).subscribe(
      (jsonData) => {
        console.log(jsonData);
        const jsonDataBody = jsonData.json();
        if (jsonDataBody.length !== 0) {
          this.days = jsonDataBody[0][2];
        }
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => {
        console.log("observable complete");
        this.cal_need();
        this.init_chart();
      }
    );
  }

  ngOnInit() {
    this.getBasic();
  }

}
