import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ActionSheetController,
  ModalController,
  NavController,
  SegmentChangeEventDetail,
} from '@ionic/angular';
import { CreateReportComponent } from '../create-report/create-report.component';
import { JournalsService } from '../journal.service';
import { Journal } from './journal.model';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.page.html',
  styleUrls: ['./journal.page.scss'],
})
export class JournalPage implements OnInit {
  myJournal: Journal;
  showEntries = 'entries';
  constructor(
    private jourServ: JournalsService,
    private route: ActivatedRoute,
    private navController: NavController,
    private router: Router,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.get('journalId')) {
        this.navController.navigateBack('/place/tabs/offers');
        return;
      }
      this.myJournal = this.jourServ.getJournal(paramMap.get('journalId'));
    });
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    this.showEntries = event.detail.value;
  }

  createEntry() {
    const newEntryId = `${
      !!this.myJournal.entries.length
        ? +this.myJournal.entries[this.myJournal.entries.length - 1].id + 1
        : 0
    }`;
    this.jourServ.addEntry(this.myJournal.id, newEntryId);
    this.router.navigateByUrl(
      '/tabs/journals/journal/' + this.myJournal.id + '/entries/' + newEntryId
    );
  }

  createTracker() {}

  createReport() {
    // action sheet for date filtering option
    this.actionSheetController
      .create({
        header: 'For Which time frame?',
        buttons: [
          { text: 'Quick Report', handler: ()=>{
            this.openReportModal();
          }},
          { text: 'Custom',handler: ()=>{
            this.openReportModal();
          }}
        ],
      })
      .then((actionEl) => {
        actionEl.present();


      });
  }


  openReportModal(){
    // create report modal
    this.modalController
    .create({
      component: CreateReportComponent,
    })
    .then((modalEl) => {
      modalEl.present();
      return modalEl.dismiss();
    });
  }

}
