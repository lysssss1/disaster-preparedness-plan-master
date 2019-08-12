import { Component, OnInit, Inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProtectdlgComponent } from '../protectdlg/protectdlg.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Headers, Http } from '@angular/http';
import { GlobalService } from '../../global.service';
import { Human } from '../../human';
import { Pet } from '../../pet';
import { HumanService } from '../../services/human.service';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {
  add_family_member: FormGroup;
  humans: Human[] = [];
  pets: Pet[] = [];
  current_human_id: number = -1;
  current_pet_id: number = -1;
  current_title: string = '';

  constructor(
    public global: GlobalService,
    private http: Http,
    public dialog: MatDialog,
    private humanS: HumanService,
    private petS: PetService
  ) {
    this.add_family_member = new FormGroup({
      kind: new FormControl(null, [Validators.required]),
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      birthdate: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      health: new FormControl(null, [Validators.required]),
      petname: new FormControl(null, [Validators.required]),
      pettype: new FormControl(null, [Validators.required]),
      weight: new FormControl(null, [Validators.required]),
    });
  }

  check_valid(): boolean {
    if (!this.add_family_member.get('kind').value)
      return true;
    if (this.add_family_member.get('kind').value == 'human') {
      if (!this.add_family_member.get('firstname').value)
        return true;
      if (!this.add_family_member.get('lastname').value)
        return true;
      if (!this.add_family_member.get('gender').value)
        return true;
      if (!this.add_family_member.get('birthdate').value)
        return true;
      if (!this.add_family_member.get('phone').value)
        return true;
      if (!this.add_family_member.get('health').value)
        return true;
    }
    else if (this.add_family_member.get('kind').value == 'pet') {
      if (!this.add_family_member.get('petname').value)
        return true;
      if (!this.add_family_member.get('pettype').value)
        return true;
      if (!this.add_family_member.get('weight').value)
        return true;
    }
    return false;
  }

  HumanAdd() {
    let registerHuman: any = {
      firstname: this.add_family_member.get('firstname').value,
      lastname: this.add_family_member.get('lastname').value,
      gender: this.add_family_member.get('gender').value,
      birthdate: this.add_family_member.get('birthdate').value,
      phone: this.add_family_member.get('phone').value,
      health: this.add_family_member.get('health').value,
    };
    const lsid = localStorage.getItem('id');
    let body = JSON.stringify({ userid: lsid, firstname: registerHuman.firstname, lastname: registerHuman.lastname, gender: registerHuman.gender, birthdate: registerHuman.birthdate, phone: registerHuman.phone, health: registerHuman.health });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/api/add/human', body, { headers: headers }).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        if (jsonDataBody.status) {
          this.getAllMembers();
          this.reset();
        }
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  PetAdd() {
    let registerPet: any = {
      petname: this.add_family_member.get('petname').value,
      pettype: this.add_family_member.get('pettype').value,
      weight: this.add_family_member.get('weight').value,
    };
    const lsid = localStorage.getItem('id');
    let body = JSON.stringify({ userid: lsid, petname: registerPet.petname, pettype: registerPet.pettype, weight: registerPet.weight });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/api/add/pet', body, { headers: headers }).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        if (jsonDataBody.status) {
          this.getAllMembers();
          this.reset();
        }
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  addnew() {
    this.current_pet_id = -1;
    this.current_human_id = -1;
    this.current_title = '';
    this.add_family_member.reset();
  }

  selectHuman(human) {
    this.current_human_id = human.id;
    this.current_pet_id = -1;
    this.current_title = human.firstname + ' ' + human.lastname;
    this.add_family_member.reset();
    let tdate = new Date(human.birthdate);
    console.log(tdate);
    this.add_family_member.setValue({
      kind: 'human',
      firstname: human.firstname,
      lastname: human.lastname,
      gender: human.gender,
      birthdate: tdate,
      phone: human.phone,
      health: human.health,
      petname: '',
      pettype: '',
      weight: '',
    });
  }

  selectPet(pet) {
    this.current_pet_id = pet.id;
    this.current_human_id = -1;
    this.current_title = pet.petname;
    this.add_family_member.reset();

    this.add_family_member.setValue({
      kind: 'pet',
      firstname: '',
      lastname: '',
      gender: '',
      birthdate: '',
      phone: '',
      health: '',
      petname: pet.petname,
      pettype: pet.pettype,
      weight: pet.weight,
    });
  }

  updatePet(id) {
    let updatePet: any = {
      petname: this.add_family_member.get('petname').value,
      pettype: this.add_family_member.get('pettype').value,
      weight: this.add_family_member.get('weight').value,
    };

    let body = JSON.stringify({ petid: id, petname: updatePet.petname, pettype: updatePet.pettype, weight: updatePet.weight });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/api/update/pet', body, { headers: headers }).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        if (jsonDataBody.status) {
          this.getAllMembers();
          this.reset();
        }
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  updateHuman(id) {
    let updateHuman: any = {
      firstname: this.add_family_member.get('firstname').value,
      lastname: this.add_family_member.get('lastname').value,
      gender: this.add_family_member.get('gender').value,
      birthdate: this.add_family_member.get('birthdate').value,
      phone: this.add_family_member.get('phone').value,
      health: this.add_family_member.get('health').value,
    };

    let body = JSON.stringify({ humanid: id, firstname: updateHuman.firstname, lastname: updateHuman.lastname, gender: updateHuman.gender, birthdate: updateHuman.birthdate, phone: updateHuman.phone, health: updateHuman.health });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/api/update/human', body, { headers: headers }).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        if (jsonDataBody.status) {
          this.getAllMembers();
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
    if ((this.current_human_id == -1) && (this.current_pet_id != -1))
      this.updatePet(this.current_pet_id);
    else if ((this.current_human_id != -1) && (this.current_pet_id == -1))
      this.updateHuman(this.current_human_id);
  }

  deleteHuman(id) {
    let body = JSON.stringify({ humanid: id });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/api/delete/human', body, { headers: headers }).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        if (jsonDataBody.status) {
          this.getAllMembers();
          this.reset();
        }
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  deletePet(id) {
    let body = JSON.stringify({ petid: id });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/api/delete/pet', body, { headers: headers }).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        if (jsonDataBody.status) {
          this.getAllMembers();
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
    let dialogRef = this.dialog.open(ProtectdlgComponent, {
      panelClass: 'custom-dialog',
      width: '250px',
      data: 'Are you sure you want to delete this family member\'s information?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if ((this.current_human_id == -1) && (this.current_pet_id != -1))
          this.deletePet(this.current_pet_id);
        else if ((this.current_human_id != -1) && (this.current_pet_id == -1))
          this.deleteHuman(this.current_human_id);
      }
    });
  }

  getAllMembers() {
    const lsid = localStorage.getItem('id');
    this.humanS.get(lsid).subscribe(
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
        };
        console.log(this.humans);
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );

    this.petS.get(lsid).subscribe(
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
        };
        console.log(this.pets);
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  FamilyMemberAdd() {
    if (this.add_family_member.get('kind').value == 'human')
      this.HumanAdd();
    if (this.add_family_member.get('kind').value == 'pet')
      this.PetAdd();
  }

  reset() {
    this.add_family_member.reset();
    this.current_human_id = -1;
    this.current_pet_id = -1;
    this.current_title = '';
  }

  ngOnInit() {
    this.getAllMembers();
  }
}
