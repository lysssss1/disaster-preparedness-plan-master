import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Headers, Http } from '@angular/http';
import { GlobalService } from '../../global.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-updatememo',
  templateUrl: './updatememo.component.html',
  styleUrls: ['./updatememo.component.scss']
})
export class UpdatememoComponent implements OnInit {
  memo_form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UpdatememoComponent>,
    private http: Http,
    public fb: FormBuilder,
    private global: GlobalService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  UpdateMemo(){
    let samplememo: any = {
      title: this.memo_form.get('title').value,
      content: this.memo_form.get('content').value,
    };

    let body = JSON.stringify({ memoid: this.data.id, title: samplememo.title, content: samplememo.content });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/api/update/memo', body, { headers: headers }).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        if (jsonDataBody.status) {
          this.memo_form.reset();
          this.dialogRef.close(true);
        }
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  ngOnInit() {
    this.memo_form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
    });
    this.memo_form.setValue({
      title: this.data.title,
      content: this.data.content,
    });
  }

}
