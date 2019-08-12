import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Headers, Http } from '@angular/http';
import { GlobalService } from '../../global.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-addmemo',
  templateUrl: './addmemo.component.html',
  styleUrls: ['./addmemo.component.scss']
})
export class AddmemoComponent implements OnInit {
  memo_form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddmemoComponent>,
    private http: Http,
    public fb: FormBuilder,
    private global: GlobalService
  ) { }

  ngOnInit() {
    this.memo_form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
    });
  }

  AddMemo() {
    let samplememo: any = {
      title: this.memo_form.get('title').value,
      content: this.memo_form.get('content').value,
    };
    const lsid = localStorage.getItem('id');
    let body = JSON.stringify({ userid: lsid, title: samplememo.title, content: samplememo.content });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/api/add/memo', body, { headers: headers }).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        if (jsonDataBody.status) {
          this.memo_form.reset();
          this.dialogRef.close();
        }
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }
}
