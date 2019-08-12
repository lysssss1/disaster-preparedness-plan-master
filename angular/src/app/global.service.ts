import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  exist: boolean;

  constructor() {
    this.exist = false;
  }
}
