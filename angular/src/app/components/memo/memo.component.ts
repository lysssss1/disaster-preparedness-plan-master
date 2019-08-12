import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Memo } from '../../memo';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalService } from '../../global.service';
import { ProtectdlgComponent } from '../protectdlg/protectdlg.component';
import { UpdatememoComponent } from '../updatememo/updatememo.component';
import { MemoService } from '../../services/memo.service';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.scss']
})
export class MemoComponent implements OnInit {
  memos: Memo[] = [];

  constructor(
    private http: Http,
    private global: GlobalService,
    public dialog: MatDialog,
    private memoS: MemoService
  ) { }

  delete(memo) {
    let dialogRef = this.dialog.open(ProtectdlgComponent, {
      panelClass: 'custom-dialog',
      width: '250px',
      data: 'Are you sure you want to delete this memo?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let body = JSON.stringify({ memoid: memo.id });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.http.post('/api/delete/memo', body, { headers: headers }).subscribe(
          (jsonData) => {
            let jsonDataBody = jsonData.json();
            if (jsonDataBody.status) {
              this.getAllMemos();
            }
          },
          // The 2nd callback handles errors.
          (err) => console.error(err),
          // The 3rd callback handles the "complete" event.
          () => console.log("observable complete")
        );
      }
    });
  }

  update(memo) {
    let dialogRef = this.dialog.open(UpdatememoComponent, {
      panelClass: 'custom-dialog',
      width: '529px',
      data: memo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllMemos();
      }
    });
  }
  getAllMemos() {
    const lsid = localStorage.getItem('id');
    this.memoS.get(lsid).subscribe(
      (jsonData) => {
        this.memos = [];
        let jsonDataBody = jsonData.json();
        for (let entry of jsonDataBody) {
          let r: Memo = {
            id: entry[0],
            title: entry[2],
            content: entry[3],
          };
          this.memos.push(r);
        };
        console.log(this.memos);
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  ngOnInit() {
    this.getAllMemos();
  }

}
