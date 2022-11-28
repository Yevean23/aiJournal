import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrototypePageRoutingModule } from './prototype-routing.module';

import { PrototypePage } from './prototype.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PrototypePageRoutingModule
  ],
  declarations: [PrototypePage]
})
export class PrototypePageModule {}
