import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BasicService } from '../../services/basic.service';
import { Headers, Http } from '@angular/http';
import { Traveltip } from '../../travel';
import { Memo } from '../../memo';
import { MemoService } from '../../services/memo.service';
import { Communication } from '../../communication';
import { CommunicationService } from '../../services/communication.service';
import { Clothing } from '../../clothing';
import { Food } from '../../food';
import { Human } from '../../human';
import { Pet } from '../../pet';
@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {
  show: boolean[] = [];
  url: string;
  trusturl: SafeResourceUrl;
  location: string;
  days: number;

  memos: Memo[] = [];
  communications: Communication[] = [];
  traveltips: Traveltip[] = [];
  clothings: Clothing[] = [];
  foods: Food[] = [];

  humans: Human[] = [];
  pets: Pet[] = [];
  petwater = 0;
  drinkwater = 0;
  foodwater = 0;


  constructor(
    private http: Http,
    private sanitizer: DomSanitizer,
    private basic: BasicService,
    private memoS: MemoService,
    private communicationS: CommunicationService,
  ) { }


  getAllMemos() {
    const lsid = localStorage.getItem('id');
    this.memoS.get(lsid).subscribe(
      (jsonData) => {
        this.memos = [];
        const jsonDataBody = jsonData.json();
        for (const entry of jsonDataBody) {
          const r: Memo = {
            id: entry[0],
            title: entry[2],
            content: entry[3],
          };
          this.memos.push(r);
        }
        console.log(this.memos);
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log('observable complete')
    );
  }

  getAllCommunications() {
    const lsid = localStorage.getItem('id');
    this.communicationS.get(lsid).subscribe(
      (jsonData) => {
        this.communications = [];
        const jsonDataBody = jsonData.json();
        for (const entry of jsonDataBody) {
          const r: Communication = {
            id: entry[0],
            firstname: entry[2],
            lastname: entry[3],
            phone: entry[4],
            email: entry[5]
          };
          this.communications.push(r);
        }
        console.log(this.memos);
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log('observable complete')
    );
  }

  getpets(): void {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const lsid = localStorage.getItem('id');
    this.http.get('/api/get/pet/' + lsid, { headers: headers }).subscribe(
      (jsonData) => {
        this.pets = [];
        let jsonDataBody = jsonData.json();
        for (let entry of jsonDataBody) {
          let r: Pet = {
            id: entry[0],
            petname: entry[2],
            pettype: entry[3],
            weight: entry[4],
          };
          this.pets.push(r);
          this.petwater = this.petwater + r.weight * 0.04;
        }
        this.petwater = this.petwater * this.days;
        console.log(this.pets);
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log('observable complete')
    );
  }

  getAllMembers(): void {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const lsid = localStorage.getItem('id');
    this.http.get('/api/get/human/' + lsid, { headers: headers }).subscribe(
      (jsonData) => {
        this.humans = [];
        let jsonDataBody = jsonData.json();
        for (let entry of jsonDataBody) {
          let r: Human = {
            id: entry[0],
            firstname: entry[2],
            lastname: entry[3],
            gender: entry[4],
            birthdate: entry[5],
            phone: entry[6],
            health: entry[7],
          };
          this.humans.push(r);
          this.drinkwater = this.drinkwater + 0.5;
          this.foodwater = this.foodwater + 1;
        }
        this.drinkwater = this.drinkwater * this.days;
        this.foodwater = this.foodwater * this.days;
        console.log(this.humans);
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => this.getpets()
    );
  }

  basicGet() {
    const lsid = localStorage.getItem('id');
    this.basic.get(lsid).subscribe(
      (jsonData) => {
        console.log(jsonData);
        const jsonDataBody = jsonData.json();
        this.location = jsonDataBody[0][1],
          this.days = jsonDataBody[0][2];
        this.url = "https://www.google.com/maps/embed/v1/search?q=" + this.location.replace(/ /g, "%20") + "%20hospital&key=AIzaSyCEtY2--C0BdVOvD7Lra_SuIc3rXoDPKoQ&language=en";
        this.trusturl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => {
        console.log("observable complete");
        this.getAllMembers();
      }
    );
  }

  getAllTravelTips(): void {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.get('/api/get/travel', { headers: headers }).subscribe(
      (jsonData) => {
        this.traveltips = [];
        let jsonDataBody = jsonData.json();
        for (const entry of jsonDataBody) {
          const r: Traveltip = {
            id: entry[0],
            name: entry[1],
            selected: false,
          };
          this.traveltips.push(r);
        }
        console.log(this.traveltips);
        const lsid = localStorage.getItem('id');
        this.http.get('/api/get/travel/' + lsid, { headers: headers }).subscribe(
          (jsonData) => {
            let jsonDataBody = jsonData.json();
            for (const entry of jsonDataBody) {
              for (const tip of this.traveltips) {
                if (entry[1] === tip.id) {
                  tip.selected = true;
                }
              }
            };
            console.log(this.traveltips);
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

  getAllClothingBeddings(): void {
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
                if (entry[1] === clothing.id) {
                  clothing.quantity = entry[2];
                }
              }
            };
            console.log(this.clothings);
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

  getAllFoods() {
    let headers = new Headers({ 'Content-Type': 'application/json' });

    this.http.get('/api/get/food', { headers: headers }).subscribe(
      (jsonData) => {
        this.foods = [];
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
                }
              }
            }
            console.log(this.foods);
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
    for (let i = 0; i < 12; i++) {
      this.show.push(true);
    }
    this.basicGet();
    this.getAllFoods();
    this.getAllClothingBeddings();
    this.getAllTravelTips();
    this.getAllCommunications();
    this.getAllMemos();
  }

  toggle(id: number) {
    this.show[id] = !this.show[id];
  }

  print() {
    //window.scroll({ top: 2500, left: 0, behavior: 'smooth' });
    //setTimeout(() => { window.print(); }, 3000);
    //document.querySelector('.map').scrollIntoView({ behavior: 'smooth' });
    //setTimeout(() => { window.print(); }, 3000);
    window.print();
  }

  up() {
    window.scrollBy(0, -200);
  }
  
  down() {
    window.scrollBy(0, 200);
  }
}
