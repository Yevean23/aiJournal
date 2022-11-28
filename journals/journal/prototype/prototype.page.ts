import { Component, OnInit } from '@angular/core';

import { pipe } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Chart, registerables } from 'chart.js';
import { AijournalService } from '../../aijournal.service';

Chart.register(...registerables);

@Component({
  selector: 'app-prototype',
  templateUrl: './prototype.page.html',
  styleUrls: ['./prototype.page.scss'],
})
export class PrototypePage implements OnInit {
  trackers = [];
  depName: string;

  times = [];
  entries = [];
  logs = [];

  acc: number;
  coefs = [];
  intercept: number;

  fitIntercept = false;

  myChart;

  constructor(private aijournal: AijournalService) {
    this.trackers = aijournal.trackers;
    this.depName = aijournal.depName;
    this.times = aijournal.times;
    this.entries = aijournal.entries;
    this.logs = aijournal.logs;
    this.acc = aijournal.acc;
    this.coefs = aijournal.coefs;
    this.intercept = +aijournal.intercept[0];
  }

  ngOnInit() {}

  addTracker() {
    this.aijournal.addTracker();
  }

  addEntry() {
    this.aijournal.addEntry();
  }

  calcCoefs() {
    this.aijournal.calcCoefs(this.fitIntercept);
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

  createGraph() {
    const canvas = document.getElementById(
      'canvas1'
    ) as HTMLCanvasElement | null;
    const ctx = canvas?.getContext('2d');

    if (this.myChart) {
      this.myChart.destroy();
    }

    const datasetss = [];
    datasetss.push({
      label: this.depName,
      data: this.logs,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    });
    this.trackers.forEach((trckr, i) => {
      const overTime = [];
      this.entries.forEach((entr, j) => {
        overTime.push(entr[i]);
      });
      datasetss.push({
        label: trckr.name,
        data: overTime,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      });
    });

    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.times,
        datasets: datasetss,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
