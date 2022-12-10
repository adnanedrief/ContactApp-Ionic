import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifierContactPageRoutingModule } from './modifier-contact-routing.module';

import { ModifierContactPage } from './modifier-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifierContactPageRoutingModule
  ],
  declarations: [ModifierContactPage]
})
export class ModifierContactPageModule {}
