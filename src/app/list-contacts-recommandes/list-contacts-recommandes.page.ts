import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list-contacts-recommandes',
  templateUrl: './list-contacts-recommandes.page.html',
  styleUrls: ['./list-contacts-recommandes.page.scss'],
})
export class ListContactsRecommandesPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  detailsContact(email) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        emailContact: email
      }
    };
    this.navCtrl.navigateForward('/detail-contact', navigationExtras);
  }
}
