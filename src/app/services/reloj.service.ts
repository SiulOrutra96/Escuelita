import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelojService {

  reloj = new BehaviorSubject<Date>(new Date());
  clock;

  constructor() {}

  pararReloj() {
    clearInterval(this.clock);
  }

  iniciarReloj() {
    this.clock = setInterval(t => {
      this.reloj.next(new Date());
    }, 1000);
  }
}
