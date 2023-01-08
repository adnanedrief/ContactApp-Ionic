import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SauvgardePageRoutingModule } from './sauvgarde-routing.module';

import { SauvgardePage } from './sauvgarde.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SauvgardePageRoutingModule
  ],
  declarations: [SauvgardePage]
})
export class SauvgardePageModule {}
