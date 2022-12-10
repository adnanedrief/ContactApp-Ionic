import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListContactsRecommandesPage } from './list-contacts-recommandes.page';


const routes: Routes = [
  {
    path: '',
    component: ListContactsRecommandesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListContactsRecommandesPageRoutingModule {}
