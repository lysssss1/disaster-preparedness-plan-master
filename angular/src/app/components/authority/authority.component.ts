import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GlobalService } from '../../global.service';
import { BasicService } from '../../services/basic.service';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.scss']
})
export class AuthorityComponent implements OnInit {
  url: string;
  trusturl: SafeResourceUrl;
  location: string;
  constructor(
    private sanitizer: DomSanitizer,
    private global: GlobalService,
    private basic: BasicService,
  ) { }

  basicGet() {
    const lsid = localStorage.getItem('id');
    this.basic.get(lsid).subscribe(
      (jsonData) => {
        console.log(jsonData);
        const jsonDataBody = jsonData.json();
        this.location = jsonDataBody[0][1];
        this.url = "https://www.google.com/maps/embed/v1/search?q=" + this.location.replace(/ /g, "%20") + "%20hospital&key=AIzaSyCEtY2--C0BdVOvD7Lra_SuIc3rXoDPKoQ&language=en";
        this.trusturl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  ngOnInit() {
    this.basicGet();
  }
}
