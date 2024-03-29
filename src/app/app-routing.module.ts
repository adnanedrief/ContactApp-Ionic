import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentification',
    pathMatch: 'full'
  },
  {
    path: 'liste-contacts',
    loadChildren: () => import('./liste-contacts/liste-contacts.module').then( m => m.ListeContactsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'ajouter-contact',
    loadChildren: () => import('./ajouter-contact/ajouter-contact.module').then( m => m.AjouterContactPageModule)
  },
  {
    path: 'detail-contact',
    loadChildren: () => import('./detail-contact/detail-contact.module').then( m => m.DetailContactPageModule)
  },
  {
    path: 'deconnexion',
    loadChildren: () => import('./deconnexion/deconnexion.module').then( m => m.DeconnexionPageModule)
  },
  {
    path: 'authentification',
    loadChildren: () => import('./authentification/authentification.module').then( m => m.AuthentificationPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'list-contacts-recommandes',
    loadChildren: () => import('./list-contacts-recommandes/list-contacts-recommandes.module').then(m=>m.ListContactsRecommandesPageModule)
  },
  {
    path: 'ajouter-contact',
    loadChildren: () => import('./ajouter-contact/ajouter-contact-routing.module').then(m=>m.AjouterContactPageRoutingModule)
  },
  {
    path: 'favoris',
    loadChildren: () => import('./favoris/favoris.module').then( m => m.FavorisPageModule)
  },
  {
    path: 'sauvgarde',
    loadChildren: () => import('./sauvgarde/sauvgarde.module').then( m => m.SauvgardePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
