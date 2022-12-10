/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { Contact } from '../models/Contact';
import { ContactAccessService } from '../services/contact-acess.service';

@Component({
  selector: 'app-liste-contacts',
  templateUrl: './liste-contacts.page.html',
  styleUrls: ['./liste-contacts.page.scss'],
})
export class ListeContactsPage implements OnInit {
  private contacts: Contact[];
  constructor(private menuCtrl: MenuController,
    private navCtrl: NavController,
    private contactservice: ContactAccessService
    ) { this.menuCtrl.enable(true);}
    ngOnInit() {
      this.contactservice.getAllContact().subscribe(data => {
        console.log(data);
         this.contacts = data.map(e => ({
          nom: e.payload.doc.data()['nom'],
            prenom: e.payload.doc.data()['prenom'],
            tel: e.payload.doc.data()['tel'],
            service: e.payload.doc.data()['service'],
            adresse: e.payload.doc.data()['adresse'],
            ville: e.payload.doc.data()['city'],
            email: e.payload.doc.data()['email'],
            photo: e.payload.doc.data()['photo'],
           }));
         console.log(this.contacts);
       });
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
