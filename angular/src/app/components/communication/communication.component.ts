import { Component, OnInit, Inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProtectdlgComponent } from '../protectdlg/protectdlg.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Headers, Http } from '@angular/http';
import { GlobalService } from '../../global.service';
import { Communication } from '../../communication';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit {
  add_communication: FormGroup;
  communications: Communication[] = [];
  current_id: number = -1;
  current_title: string = '';
  constructor(
    public global: GlobalService,
    private http: Http,
    public dialog: MatDialog,
    private communicationS: CommunicationService
  ) {
    this.add_communication = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
    });
  }

  CommunicationAdd() {
    let sampleCommunication: any = {
      firstname: this.add_communication.get('firstname').value,
      lastname: this.add_communication.get('lastname').value,
      phone: this.add_communication.get('phone').value,
      email: this.add_communication.get('email').value,
    };
    const lsid = localStorage.getItem('id');
    let body = JSON.stringify({ userid: lsid, firstname: sampleCommunication.firstname, lastname: sampleCommunication.lastname, phone: sampleCommunication.phone, email: sampleCommunication.email });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/api/add/communication', body, { headers: headers }).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        if (jsonDataBody.status) {
          this.getAllCommunications();
          this.reset();
        }
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  update() {
    if (this.current_id == -1)
      return;

    let sampleCommunication: any = {
      firstname: this.add_communication.get('firstname').value,
      lastname: this.add_communication.get('lastname').value,
      phone: this.add_communication.get('phone').value,
      email: this.add_communication.get('email').value,
    };

    let body = JSON.stringify({ communicationid: this.current_id, firstname: sampleCommunication.firstname, lastname: sampleCommunication.lastname, phone: sampleCommunication.phone, email: sampleCommunication.email });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/api/update/communication', body, { headers: headers }).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        if (jsonDataBody.status) {
          this.getAllCommunications();
          this.reset();
        }
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  delete() {
    if (this.current_id == -1)
      return;

    let dialogRef = this.dialog.open(ProtectdlgComponent, {
      panelClass: 'custom-dialog',
      width: '250px',
      data: 'Are you sure you want to delete this communication?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let body = JSON.stringify({ communicationid: this.current_id });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.http.post('/api/delete/communication', body, { headers: headers }).subscribe(
          (jsonData) => {
            let jsonDataBody = jsonData.json();
            if (jsonDataBody.status) {
              this.getAllCommunications();
              this.reset();
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

  addnew() {
    this.current_id = -1;
    this.current_title = '';
    this.add_communication.reset();
  }

  reset() {
    this.current_id = -1;
    this.current_title = '';
    this.add_communication.reset();
  }

  select(communication) {
    this.current_id = communication.id;
    this.current_title = communication.firstname + ' ' + communication.lastname;
    this.add_communication.reset();
    this.add_communication.setValue({
      firstname: communication.firstname,
      lastname: communication.lastname,
      phone: communication.phone,
      email: communication.email,
    });
  }

  getAllCommunications() {
    const lsid = localStorage.getItem('id');
    this.communicationS.get(lsid).subscribe(
      (jsonData) => {
        this.communications = [];
        let jsonDataBody = jsonData.json();
        for (let entry of jsonDataBody) {
          let r: Communication = {
            id: entry[0],
            firstname: entry[2],
            lastname: entry[3],
            phone: entry[4],
            email: entry[5]
          };
          this.communications.push(r);
        };
        console.log(this.communications);
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  ngOnInit() {
    this.getAllCommunications();
  }

}
