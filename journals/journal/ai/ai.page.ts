import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { AijournalService } from '../../aijournal.service';

@Component({
  selector: 'app-ai',
  templateUrl: './ai.page.html',
  styleUrls: ['./ai.page.scss'],
})
export class AiPage implements OnInit, AfterViewInit {
  trackers = [];
  depName: string;

  times = [];
  entries = [];
  logs = [];

  acc: number;
  coefs = [];
  intercept: number;

  fitIntercept = true;

  myChart;
  retu: any;
  selectedSingle: string;
  analyticsSingleTracker = 'analyticsSingleTracker';

  heatmap= 'https://img.freepik.com/vetores-gratis/icone-realista-quebrado-vidro-fosco_1284-12125.jpg';

  constructor(
    private aijournal: AijournalService,
    private pickerCtrl: PickerController
   ) {
    this.trackers = aijournal.trackers;
    this.depName = aijournal.depName;
    this.times = aijournal.times;
    this.entries = aijournal.entries;
    this.logs = aijournal.logs;
    this.acc = aijournal.retu.acc;
    this.coefs = aijournal.coefs;
    this.intercept = aijournal.retu.intercept;

    this.heatmap = aijournal.heatmap;

    this.selectedSingle = aijournal.depName;
    this.retu = aijournal.retu;
  }

  async ngOnInit() {
    await this.calcCoefs();
    //this.createGraph(this.analyticsSingleTracker);
  }

  ionViewWillEnter(){
    //this.aijournal.genHeatMap();
    this.createGraph(this.analyticsSingleTracker);
  }

  ngAfterViewInit(){
    // this.createGraph(this.analyticsSingleTracker);
  }

  async openPicker() {

    const myoptions = []; // = [{text: this.depName, value: this.depName}];
    this.trackers.forEach(el => {myoptions.push({text: el.name, value: el.name});});

    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'languages',
          options: myoptions,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            this.selectedSingle = value.languages.value;
            this.createGraph(this.analyticsSingleTracker);
          },
        },
      ],
    });

    await picker.present();
  }

  createGraph(id: string) {
    const canvas = document.getElementById(
      id
    ) as HTMLCanvasElement | null;
    const ctx = canvas?.getContext('2d');

    if (this.myChart) {
      this.myChart.destroy();
    }

    const datasetss = [];
    datasetss.push({
      label: this.depName,
      data: this.logs.reverse(),
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

    const predictedMood = [];
    this.entries.reverse().forEach((entr, j) => {
      let pred = 0;
      entr.forEach((element,i) => {
        pred += element*this.coefs[i];
      });
      console.log('int',this.intercept);
      pred += this.retu.intercept;
      predictedMood.push(pred);
    });

    datasetss.push({
      label: 'predicted',
      data: predictedMood,
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
      borderWidth: 2,
    });

    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.times.reverse(),
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

  async calcCoefs() {
    this.aijournal.calcCoefs(this.fitIntercept);
  }

}
