import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ListContactsRecommandesPage } from './list-contacts-recommandes.page';
import { ListContactsRecommandesPageRoutingModule } from './list-contacts-recommandes-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListContactsRecommandesPageRoutingModule
  ],
  declarations: [ListContactsRecommandesPage]
})
export class ListContactsRecommandesPageModule {}
