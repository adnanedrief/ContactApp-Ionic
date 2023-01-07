/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { Contact } from '../models/Contact';
import { ContactAccessService } from '../services/contact-acess.service';
import { ContactAuthService } from '../services/contact-auth.service';

@Component({
  selector: 'app-liste-contacts',
  templateUrl: './liste-contacts.page.html',
  styleUrls: ['./liste-contacts.page.scss'],
})
export class ListeContactsPage implements OnInit {
  private contacts: Contact[];
  private email: string;
  private contactSearchResult: Contact[];

  constructor(private menuCtrl: MenuController,
    private navCtrl: NavController,
    private firestore: ContactAccessService,
    private fireAuth: ContactAuthService
    ) { this.menuCtrl.enable(true);}
    ngOnInit() {
      this.fireAuth.userDetails().subscribe(res => {
        console.log('res', res);
        if(res !== null){
          this.email = res.email;
          this.firestore.getAllPersonalContact(this?.email).subscribe(data => {
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
          });
        }else {
          this.navCtrl.navigateForward('/authentification');
        }
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
  searchContact(ev: any){
    const val = ev.target.value;
    if(val && val.trim() !== ''){
      this.contactSearchResult = this.contacts.filter((item)=>(item.nom.toLowerCase().indexOf(val.toLowerCase())>-1));

      this.contacts = this.contactSearchResult;
    }else{
      this.firestore.getAllPersonalContact(this?.email).subscribe(data => {
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
      });
    }


  }
}
