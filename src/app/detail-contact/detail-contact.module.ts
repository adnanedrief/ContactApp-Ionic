import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailContactPageRoutingModule } from './detail-contact-routing.module';

import { DetailContactPage } from './detail-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DetailContactPageRoutingModule
  ],
  declarations: [DetailContactPage]
})
export class DetailContactPageModule {}
