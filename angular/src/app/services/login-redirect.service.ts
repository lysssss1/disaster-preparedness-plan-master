import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LoginRedirectService implements CanActivate {

  constructor(private router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem('id')) {
      this.router.navigateByUrl('/info/basic');
      return false;
    } else {
      return true;
    }
  }

}
