import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicService } from '../../services/basic.service';
import { GlobalService } from '../../global.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddmemoComponent } from '../addmemo/addmemo.component';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {
  username: string;
  exist: boolean;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private basic: BasicService,
    private global: GlobalService
  ) { }

  checkBasic() {
    const lsid = localStorage.getItem('id');
    this.basic.get(lsid).subscribe(
      (jsonData) => {
        console.log(jsonData);
        const jsonDataBody = jsonData.json();
        if (jsonDataBody.length === 0) {
          this.global.exist = false;
        } else {
          this.global.exist = true;
        }
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  openMemoDialog(): void {
    const dialogRef = this.dialog.open(AddmemoComponent, {
      panelClass: 'custom-dialog',
      width: '529px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.router.url === '/info/memo') {
        location.reload();
      }
    });
  }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.checkBasic();
  }

  Logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    this.global.exist = false;
    this.router.navigate(['/home']);
  }
}
