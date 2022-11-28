import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Mes contacts', url: '/liste-contacts'},
    { title: 'Recommendations', url: '/liste-contacts'},
    { title: 'Profil', url: '/profile'},
    { title: 'Déconnexion', url: '/authentification'},
    { title: 'Inscription', url: '/inscription'},
  ];
  constructor() {}
}
