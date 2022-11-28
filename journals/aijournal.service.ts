import { HttpClient } from '@angular/common/http';
import { Injectable, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { pipe } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

interface LinRegReturn {
  coefs: any[];
  intercept: number;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class AijournalService {
  trackers = [{ name: 'Tracker 1', streak: 0 }];
  depName = 'Mood';

  times = [];
  entries = [];
  logs = [];

  acc: number;
  coefs = [];
  intercept: number;

  retu = {
    intercept: 0,
    acc: 0,
    coefs: []
  };
  heatmap;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
    ) {
    this.addEntry(1);
    this.addEntry(2);
    this.addEntry(3);
    this.addEntry(4);
    this.addEntry(5);
    this.addEntry(6);
    this.addEntry(7);
  }

  addTracker() {
    this.trackers.push({ name: 'Tracker' , streak: 0});
    this.entries.forEach((entr) => {
      entr.push('');
    });
  }

  addEntry(newEntryValue: any = '') {
    newEntryValue = String(newEntryValue);
    const newEntry = [];

    if (this.trackers) {
      for (const t of this.trackers) {
        newEntry.push('');
      }
    } else {
      newEntry.push(newEntryValue);
    }
    this.logs.push('');
    this.entries.push(newEntry);

    let newDate;
    if(this.times.length){
      const currDate = this.times[this.times.length - 1];
      const newDateTime = (new Date(currDate)).getTime() - 1000*60*60*24;
      newDate = new Date(newDateTime).toDateString();
    }else {
      newDate = new Date().toDateString();
    }
    this.times.push(newDate);
  }

  calcCoefs(fitIntercept: boolean) {
/*     console.log('trackers', this.trackers);
    console.log('entries', this.entries);
    console.log('logs', this.logs); */

    this.acc = 0;
    //this.coefs = [];
    for (const t of this.trackers) {
      this.coefs.push('');
    }

    this.getCoefs(fitIntercept).subscribe((ret) => {
      for (const [i, t] of this.trackers.entries()) {
        this.coefs[i] = ret.coefs[i];
      }
      this.acc = ret.score;
      this.intercept = ret.intercept;
      this.retu.intercept = this.intercept;
      this.retu.acc = this.acc;
    });
  }

  getCoefs(fitIntercept: boolean) {
    const base = 'http://127.0.0.1:5000';
    const url =
      base +
      `/linreg?X=${JSON.stringify(this.entries)}&y=${JSON.stringify([
        this.logs,
      ])}&fit_intercept=${JSON.stringify(fitIntercept)}`;
    //console.log('url', url);
    return this.http.get<LinRegReturn>(url);
  }

  genHeatMap(){
    this.getHeatmap().subscribe((ret) => {
      console.log('ret',ret);
      this.heatmap = URL.createObjectURL(ret);
      this.heatmap = this.sanitizer.bypassSecurityTrustUrl(this.heatmap);
      console.log('this.heatmap', this.heatmap);
    });
  }

  getHeatmap() {
    const base = 'http://127.0.0.1:5000';
    const url =
      base +
      `/heatmap2?X=${JSON.stringify(this.entries)}&y=${JSON.stringify([
        this.logs,
      ])}`;
    console.log('url', url);
    return this.http.get(url, { responseType: 'blob' });
  }

  removeEntry(i: number) {
    this.entries.splice(i, 1);
    this.logs.splice(i, 1);
    this.times.splice(i, 1);
  }

  removeTracker(i: number) {
    this.trackers.splice(i, 1);
    this.entries.forEach((entr) => {
      entr.splice(i, 1);
    });
  }
}
