import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { JournalsService } from '../../journal.service';
import { Journal } from '../journal.model';
import { Report } from './report.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  myJournal: Journal;
  myReport: Report;
  isOpen=true;
  constructor(
    private jourServ: JournalsService,
    private route: ActivatedRoute,
    private navController: NavController,
  ) { }

  ngOnInit() {

  }
  openPopover(){
    this.isOpen=true;
  }
}
