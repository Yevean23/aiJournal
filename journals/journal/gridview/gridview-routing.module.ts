import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GridviewPage } from './gridview.page';

const routes: Routes = [
  {
    path: '',
    component: GridviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GridviewPageRoutingModule {}
