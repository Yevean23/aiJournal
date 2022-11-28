import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canLoad: [AuthGuard],
    children: [
          {
            path: 'journals',
            children: [
              {
                path: '',
                loadChildren: () => import('../journals/journals.module').then( m => m.JournalsPageModule),
              },
              {
                path: 'journal/:journalId',
                loadChildren: () => import('../journals/journal/journal.module').then(m => m.JournalPageModule)
              },
              {
                path: 'journal/:journalId/entries/:entryId',
                loadChildren: () => import('../journals/journal/week/week.module').then(m => m.WeekPageModule)
              },
              {
                path: 'journal/:journalId/reports/:reportId',
                loadChildren: () => import('../journals/journal/reports/reports.module').then(m => m.ReportsPageModule)
              }
            ]
          },
          {
            path: 'day',
            loadChildren: () => import('../journals/journal/day/day.module').then( m => m.DayPageModule)
          },
          {
            path: 'week',
            loadChildren: () => import('../journals/journal/week/week.module').then( m => m.WeekPageModule)
          },
          {
            path: 'month',
            loadChildren: () => import('../journals/journal/month/month.module').then( m => m.MonthPageModule)
          },
          {
            path: 'ai',
            loadChildren: () => import('../journals/journal/ai/ai.module').then( m => m.AiPageModule)
          },
          {
            path: 'grid',
            loadChildren: () => import('../journals/journal/gridview/gridview.module').then( m => m.GridviewPageModule)
          },
          {
            path: 'fav',
            loadChildren: () => import('../fav/fav.module').then(m=>m.FavPageModule)
          },
          {
            path: 'profile',
            loadChildren: () => import('../profile/profile.module').then(m=>m.ProfilePageModule)
          },
          {
            path: 'prototype',
            loadChildren: () => import('../journals/journal/prototype/prototype.module').then( m => m.PrototypePageModule)
          },
          {
            path: '',
            redirectTo: '/tabs/journals',
            pathMatch: 'full'
          }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
