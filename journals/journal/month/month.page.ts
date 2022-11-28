import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { AijournalService } from '../../aijournal.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.page.html',
  styleUrls: ['./month.page.scss'],
})
export class MonthPage implements OnInit {
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

  constructor(private aijournal: AijournalService, private pickerController: PickerController) {
    this.trackers = aijournal.trackers;
    this.depName = aijournal.depName;
    this.times = aijournal.times;
    this.entries = aijournal.entries;
    this.logs = aijournal.logs;
    this.coefs = aijournal.coefs;
    this.retu = aijournal.retu;



    const years = [];
    const months = ['January','Febuary','March','April','May','June','July','August','September','November','December'];
    for(let i = 0; i !== 100; i++){
      years.push(new Date().getFullYear()-i);
    }

    this.multiColumnOptions = [months,years];
  }

  ngOnInit() {
    this.createGraph();
  }

  ionOnViewDidEnter(){
    this.createGraph();
  }

  createGraph() {
    const canvas = document.getElementById(
      'weeklyBins'
    ) as HTMLCanvasElement | null;
    const ctx = canvas?.getContext('2d');

    if (this.myChart) {
      this.myChart.destroy();
    }

    const datasetss = [];
    datasetss.push({
      label: this.depName,
      data: this.logs
        .slice(this.entryNum, this.entryNum + this.entrySlice)
        .reverse(),
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
        // 'rgba(54, 162, 235, 1)',
        // 'rgba(255, 206, 86, 1)',
        // 'rgba(75, 192, 192, 1)',
        // 'rgba(153, 102, 255, 1)',
        // 'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    });
    this.trackers.forEach((trckr, i) => {
      const overTime = [];
      this.entries
        .slice(this.entryNum, this.entryNum + this.entrySlice)
        .reverse()
        .forEach((entr, j) => {
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
      type: 'bar',
      data: {
        labels: [1,2,3,4],
        datasets: [{
          label: 'bar',
          data: [4,3,2,1],
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
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 2
          },
        },
        animation: {
          duration: 0,
        },
      },
    });
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

  range(i: number){
    const ret = [];
    for(let j=0;j!==i;j++){
      ret.push(j);
    }
    return ret;
  }

  getDateNumber(i: number,j: number){

    const firstDay = new Date(`${this.trackedDay.getMonth()+1}/1/${this.trackedDay.getFullYear()}`).getDay();

    const daysInMonth = new Date(this.trackedDay.getFullYear(), this.trackedDay.getMonth()+1, 0).getDate();

    const check = i*7+j >= firstDay && i*7+j < (firstDay + daysInMonth);

    const p = (i*7+j) - (firstDay) + 1;

    return check ? p : '';
  }

  dayOfTheWeek(day, month, year){
    return this.dayOfWeek[this.trackedDay.getDay()];
  };

  weekOfTheMonth(day, month, year){
    const o = Math.floor((day + new Date(`${month}/1/${year}`).getDay()) / 7);
    return o;
  };


  calendarOpenModal(){
    this.openPicker();
  }

  async openPicker(numColumns = 2, numOptions = [11,99], columnOptions = this.multiColumnOptions) {
    const picker = await this.pickerController.create({
      columns: this.getColumns(numColumns, numOptions, columnOptions),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            this.trackedDay = new Date(`${value['col-0'].text}/1/${value['col-1'].text}`);
          },
        },
      ],
    });

    await picker.present();
  }

  getColumns(numColumns, numOptions, columnOptions) {
    const columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col-${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions),
      });
    }
    return columns;
  }

  getColumnOptions(columnIndex, numOptions, columnOptions) {

    const options = [];
    for (let i = 0; i < numOptions[columnIndex]; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions[columnIndex]],
        value: i,
      });
    }

    return options;
  }

  calendarForwardOneMonth(){
    const month = (this.trackedDay.getMonth()+2)%13;
    this.trackedDay = new Date(`${month ? month : 1}/1/${month ? this.trackedDay.getFullYear() : this.trackedDay.getFullYear() + 1}`);
  }

  calendarBackOneMonth(){
    const month = this.trackedDay.getMonth();
    this.trackedDay = new Date(`${month ? month : '12'}/1/${month ? this.trackedDay.getFullYear() : this.trackedDay.getFullYear() -1}`);
  }

  getCalendarDayStyle(i,j){
    let style = '';

    const date = this.getDateNumber(i,j);

    if(!date){
      return '';
    }

    const today = new Date();
    const checkDate = new Date(`${this.trackedDay.getMonth()+1}/${date}/${this.trackedDay.getFullYear()}`);
    if (
      this.trackedDay.getFullYear() === today.getFullYear() &&
      date === today.getDate() &&
      this.trackedDay.getMonth() === today.getMonth()
    ){
      style += 'border: 1px blue solid;';
    }
    console.log(this.getFill(checkDate));
    style+= `background-color: rgba(0,255,0,${this.getFill(checkDate)});`;
    return style;
  }

  getFill(checkdate){
    const cehk = checkdate.toDateString();
    const index = this.aijournal.times.findIndex(el => el === cehk);
    if(index === -1){
      return 0;
    } else {
      const entr = this.aijournal.entries[index];
      const len = entr.length;
      let entered = 0;
      entr.forEach(element => {
        if(element!==''){
          entered+=1;
        }
      });

      const percent = entered/len;
      return percent;
    }
  }

  addHabit(){
    this.aijournal.addTracker();
  }

}
