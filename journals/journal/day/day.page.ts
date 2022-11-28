import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AijournalService } from '../../aijournal.service';
import { CreateHabitComponent } from '../../create-habit/create-habit.component';

import { JournalsService } from '../../journal.service';
import { Tracker } from '../entries/tracker.model';

@Component({
  selector: 'app-day',
  templateUrl: './day.page.html',
  styleUrls: ['./day.page.scss'],
})
export class DayPage implements OnInit {
  loadedHabits: Tracker[] = [];

  trackers = [];
  depName;
  times = [];
  entries = [];
  logs = [];

  todoList: any[] = [];

  questLevel = 0;

  todoListItem: string;
  todoDONE: number;
  todoTODO: number;


  entryNum=0;
  journalEntry;

  recordedMood=false;

  constructor(
    private journalService: JournalsService,
    private modalController: ModalController,
    private aijournal: AijournalService
  ) {
    this.trackers = aijournal.trackers;
    this.depName = aijournal.depName;
    this.times = aijournal.times;
    this.entries = aijournal.entries;
    this.logs = aijournal.logs;
  }

  ngOnInit() {
    this.todoDONE = 0;
    this.todoTODO = Math.floor(Math.random()*5);
    this.loadedHabits = this.journalService.journals[0].trackers;
  }

  onRecordHabit(event: any, el: any) {
    el.el.color =
      Math.random() < 0.25
        ? 'primary'
        : Math.random() > 0.5
        ? 'tertiary'
        : 'secondary';
    console.log('recording habit');
    // if habit needs input, ask for it
  }

  async onAddHabit() {
    // const el = await this.modalController.create({ component: CreateHabitComponent });
    // await el.present();
    // const data = await el.onWillDismiss();
    // console.log(data);
    this.aijournal.addTracker();
  }

  onAddTodo(){
    console.log('adding Todo',this.todoListItem);
    this.todoDONE +=1;
  }

  removeHabit(){}

  trackByFn(index, item) {
    return index;
  }

  prevEntry(){
    if(this.entryNum >= this.entries.length-1){
      this.aijournal.addEntry();
    }
    this.entryNum++;
    console.log('entryNum', this.entries);
    console.log('entryNum', this.entryNum);
  }

  nextEntry(){
    if(this.entryNum > 0){
      this.entryNum --;
    }
    console.log('entryNum', this.entryNum);
  }

  recordMood(event, el){
    this.recordedMood=true;
    el.el.color =
      Math.random() < 0.25
        ? 'primary'
        : Math.random() > 0.5
        ? 'tertiary'
        : 'secondary';
    console.log('recording habit',el);
    this.logs[this.entryNum] = Math.ceil(event.target.value/10);
  }
}
