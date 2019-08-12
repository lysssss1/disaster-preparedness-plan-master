import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BasicService } from '../../services/basic.service';
import { GlobalService } from '../../global.service';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-basicinfo',
  templateUrl: './basicinfo.component.html',
  styleUrls: ['./basicinfo.component.scss']
})
export class BasicinfoComponent implements OnInit {
  basic_form: FormGroup;
  exist = false;

  constructor(
    private http: Http,
    public dialog: MatDialog,
    private basic: BasicService,
    private router: Router,
    private global: GlobalService
  ) {
    this.basic_form = new FormGroup({
      location: new FormControl(null, [Validators.required]),
      days: new FormControl(null, [Validators.required])
    });
  }

  reset() {
    this.basic_form.reset();
  }

  BasicUpdate() {
    this.global.exist = true;
    const updateBasic: any = {
      userid: localStorage.getItem('id'),
      location: this.basic_form.get('location').value,
      days: this.basic_form.get('days').value
    };

    if (this.exist) {
      this.basic.update(updateBasic).subscribe(
        (jsonData) => {
          if (jsonData.status) {
            this.router.navigate(['info/print']);
          }
        },
        // The 2nd callback handles errors.
        (err) => console.error(err),
        // The 3rd callback handles the "complete" event.
        () => console.log("observable complete")
      );
    } else {
      this.basic.add(updateBasic).subscribe(
        (jsonData) => {
          if (jsonData.status) {
            this.router.navigate(['info/family']);
          }
        },
        // The 2nd callback handles errors.
        (err) => console.error(err),
        // The 3rd callback handles the "complete" event.
        () => console.log("observable complete")
      );
    }
  }

  basicGet() {
    const lsid = localStorage.getItem('id');
    this.basic.get(lsid).subscribe(
      (jsonData) => {
        console.log(jsonData);
        const jsonDataBody = jsonData.json();
        if (jsonDataBody.length !== 0) {
          this.exist = true;
          this.basic_form.setValue({
            location: jsonDataBody[0][1],
            days: jsonDataBody[0][2]
          });
        }
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
