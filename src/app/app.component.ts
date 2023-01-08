import { Component, OnInit } from '@angular/core';
import {ContactAccessService} from './services/contact-acess.service';
import { NavController } from '@ionic/angular';
import { ContactAuthService } from './services/contact-auth.service';
import { Compte } from './models/Compte';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public currentUserEmail ='adnane@hamza.com';
  public appPages = [
    { title: 'Mes contacts', url: '/liste-contacts'},
    { title: 'Recommendations', url: '/list-contacts-recommandes'},
    { title: 'Profil', url: '/profile'},
    { title: 'Favoris', url: '/favoris'},
    { title: 'Déconnexion', url: '/deconnexion'},
  ];
  compte: Compte;
  private isDark: string | undefined | null;
  constructor(private navCtrl: NavController,
    private contactsetvice: ContactAccessService,
    private fireAuth: ContactAuthService) {this.isDark = localStorage.getItem('isDark');}
  ngOnInit(){
    this.fireAuth.userDetails().subscribe(res => {
      console.log('res', res);
      if(res !== null){
        this.currentUserEmail = res.email;//email
        this.contactsetvice.getCompte(this.currentUserEmail).subscribe(compte => {
          console.log('Get compte for user ', res);
          this.compte = compte as Compte;
        });
      }else {
        this.navCtrl.navigateForward('/authentification');
      }
    });
  }
  toggleDark(ev: any) {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    systemDark.addEventListener('change', (e) => {
      this.colorTest(e);
    });
    if (ev.detail.checked) {
      localStorage.setItem('isDark', 'true');
      document.body.setAttribute('data-theme', 'dark');
    } else {
      localStorage.setItem('isDark', 'false');
      document.body.setAttribute('data-theme', 'light');
    }
  }

  colorTest(systemInitiatedDark: { matches: any }) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }
}
