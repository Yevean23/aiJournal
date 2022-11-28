import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JournalPage } from './journal.page';

const routes: Routes = [
  {
    path: '',
    component: JournalPage
  },
  {
    path: 'entries',
    loadChildren: () => import('./entries/entries.module').then( m => m.EntriesPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
  },
  {
    path: 'day',
    loadChildren: () => import('./day/day.module').then( m => m.DayPageModule)
  },
  {
    path: 'week',
    loadChildren: () => import('./week/week.module').then( m => m.WeekPageModule)
  },
  {
    path: 'month',
    loadChildren: () => import('./month/month.module').then( m => m.MonthPageModule)
  },
  {
    path: 'ai',
    loadChildren: () => import('./ai/ai.module').then( m => m.AiPageModule)
  },
  {
    path: 'grid',
    loadChildren: () => import('./gridview/gridview.module').then( m => m.GridviewPageModule)
  },
  {
    path: 'prototype',
    loadChildren: () => import('./prototype/prototype.module').then( m => m.PrototypePageModule)
  },
  {
    path: 'gridview',
    loadChildren: () => import('./gridview/gridview.module').then( m => m.GridviewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JournalPageRoutingModule {}
