import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-liste-contacts',
  templateUrl: './liste-contacts.page.html',
  styleUrls: ['./liste-contacts.page.scss'],
})
export class ListeContactsPage implements OnInit {

  constructor(private menuCtrl: MenuController,
    private navCtrl: NavController
    ) { this.menuCtrl.enable(true);}
  ngOnInit() {
  }
  ajouterContact(){
    this.navCtrl.navigateRoot('/ajouter-contact');
  }
  detailsContact(email) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        emailContact: email,
        from:'liste-contacts'
      }
    };
    this.navCtrl.navigateForward('/detail-contact', navigationExtras);
  }
}
