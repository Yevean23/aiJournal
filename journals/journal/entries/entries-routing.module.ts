import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntriesPage } from './entries.page';

const routes: Routes = [
  {
    path: '',
    component: EntriesPage
  },
  {
    path: 'entry',
    loadChildren: () => import('./entry/entry.module').then( m => m.EntryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntriesPageRoutingModule {}
