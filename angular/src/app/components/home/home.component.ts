import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { GlobalService } from '../../global.service';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { BasicService } from '../../services/basic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  login_form: FormGroup;
  register_form: FormGroup;
  hide1: string;
  hide2: string;
  constructor(
    private router: Router,
    private global: GlobalService,
    private http: Http,
    public snackBar: MatSnackBar,
    private auth: AuthService,
    private basic: BasicService,
  ) {
    this.login_form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });

    this.register_form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirm: new FormControl(null, [Validators.required]),
    });
  }

  checkBasic() {
    const lsid = localStorage.getItem('id');
    this.basic.get(lsid).subscribe(
      (jsonData) => {
        console.log(jsonData);
        const jsonDataBody = jsonData.json();
        if (jsonDataBody.length === 0) {
          this.global.exist = false;
          this.router.navigate(['info/basic']);
        } else {
          this.global.exist = true;
          this.router.navigate(['info/print']);
        }
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  Login(): void {
    let body = JSON.stringify({ username: this.login_form.get('username').value, password: this.login_form.get('password').value });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/api/login', body, { headers: headers }).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        if (jsonDataBody.status) {
          localStorage.setItem('id', jsonDataBody.id);
          localStorage.setItem('username', jsonDataBody.username);
          this.checkBasic();
        }
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  Register(): void {
    let body = JSON.stringify({ username: this.register_form.get('username').value, password: this.register_form.get('password').value });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/api/register', body, { headers: headers }).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        if (jsonDataBody.status) {
          localStorage.setItem('id', jsonDataBody.id);
          localStorage.setItem('username', jsonDataBody.username);
          this.checkBasic();
        }
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  ngOnInit() {
    this.hide1 = 'visibility_off';
    this.hide2 = 'visibility_off';
  }

}
