import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SauvgardePage } from './sauvgarde.page';

const routes: Routes = [
  {
    path: '',
    component: SauvgardePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SauvgardePageRoutingModule {}
