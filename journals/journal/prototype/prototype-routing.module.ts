import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrototypePage } from './prototype.page';

const routes: Routes = [
  {
    path: '',
    component: PrototypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrototypePageRoutingModule {}
