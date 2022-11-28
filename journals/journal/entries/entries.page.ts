import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { JournalsService } from '../../journal.service';
import { Journal } from '../journal.model';
import { Entry } from './entry.model';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.page.html',
  styleUrls: ['./entries.page.scss'],
})
export class EntriesPage implements OnInit {
  myEntry: Entry;
  journalId: string;
  myJournal: Journal;
  entryId: string;

  constructor(
    private journalService: JournalsService,
    private route: ActivatedRoute,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.get('journalId')){
        this.navController.navigateBack('/journals');
        return;
      }
      this.journalId = paramMap.get('journalId');
      this.entryId = paramMap.get('entryId');
      this.myEntry = this.journalService.getEntry(this.journalId,this.entryId);
      this.myJournal = this.journalService.getJournal(this.journalId);
    });
  }

  onAddTracker(){
    this.journalService.addTracker(this.journalId,this.myEntry?.id,'','');
  }

}
