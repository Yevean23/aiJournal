import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GridviewPageRoutingModule } from './gridview-routing.module';

import { GridviewPage } from './gridview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GridviewPageRoutingModule
  ],
  declarations: [GridviewPage]
})
export class GridviewPageModule {}
