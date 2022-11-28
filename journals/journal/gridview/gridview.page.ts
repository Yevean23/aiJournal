import { Component, OnInit } from '@angular/core';
import { AijournalService } from '../../aijournal.service';

@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.page.html',
  styleUrls: ['./gridview.page.scss'],
})
export class GridviewPage implements OnInit {
  myChart;

  entryNum = 0;
  entrySlice = 5;

  trackers = [];
  depName: string;

  times = [];
  entries = [];
  logs = [];

  acc: number;
  coefs = [];
  intercept: number;

  retu;

  trackedDay = new Date();
  dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  multiColumnOptions = [];

  constructor(private aijournal: AijournalService) {
    this.trackers = aijournal.trackers;
    this.depName = aijournal.depName;
    this.times = aijournal.times;
    this.entries = aijournal.entries;
    this.logs = aijournal.logs;
    this.coefs = aijournal.coefs;
    this.retu = aijournal.retu;
  }

  ngOnInit() {
  }

  addTracker() {
    this.aijournal.addTracker();
  }

  addEntry() {
    this.aijournal.addEntry();
  }

  trackByFn(index, item) {
    return index;
  }

  removeEntry(i: number) {
    this.aijournal.removeEntry(i);
  }

  removeTracker(i: number) {
    this.aijournal.removeTracker(i);
  }

}
