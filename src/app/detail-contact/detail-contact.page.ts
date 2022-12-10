import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Contact } from '../models/Contact';
import { ContactAccessService } from '../services/contact-acess.service';
import { ContactAuthService } from '../services/contact-auth.service';

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.page.html',
  styleUrls: ['./detail-contact.page.scss'],
})
export class DetailContactPage implements OnInit {
  emailContact: string;
  from: string;
  contact: Contact;
  private isButtonsVisible = false;
  constructor(private contactservice: ContactAccessService,
    private fireauth: ContactAuthService,
    private firestore: ContactAccessService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.emailContact = params.emailContact;
      this.from = params.from;
      if (this.from === 'list-contacts-recommandes')
        {this.isButtonsVisible = false;}
      else
        {this.isButtonsVisible = true;}
    });
  }
  ngOnInit() {
    if (this.from === 'list-contacts-recommandes')
      {this.recommande();}
    else
      {this.personel();}
  }
  personel() {
    this.fireauth.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.contactservice.getPersonalContact(res.email, this.emailContact).subscribe(res1 => {
          this.contact = res1 as Contact;
          console.log(res1);
        });
      } else {
        this.navCtrl.navigateForward('/authentification');
      }
    }, err => {
      console.log('err', err);
    });
  }
  recommande() {
    this.fireauth.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.contactservice.getContact(this.emailContact).subscribe(res1 => {
          this.contact = res1 as Contact;
          console.log(res1);
        });
      } else {
        this.navCtrl.navigateForward('/authentification');
      }
    }, err => {
      console.log('err', err);
    });
  }
supprimer() {
    this.fireauth.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.contactservice.delateContactPersonel(res.email, this.contact.email);
        this.navCtrl.navigateForward('/liste-contacts');
      } else {
        this.navCtrl.navigateForward('/authentification');
      }
    }, err => {
      console.log('err', err);
    });
  }
  partager() {
    this.fireauth.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.firestore.newContact(this.contact);
        this.navCtrl.navigateForward('/list-contacts-recommandes');
      } else {
        this.navCtrl.navigateForward('/authentification');
      }
    }, err => {
      console.log('err', err);
    });
  }
}
