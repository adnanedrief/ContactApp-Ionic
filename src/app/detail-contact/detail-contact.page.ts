/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Contact } from '../models/Contact';
import { ContactAccessService } from '../services/contact-acess.service';
import { ContactAuthService } from '../services/contact-auth.service';
import {CallNumber} from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.page.html',
  styleUrls: ['./detail-contact.page.scss'],
})
export class DetailContactPage implements OnInit {
  emailContact: string;
  from: string;
  contact: Contact;
  modified: boolean;
  LocationUrl: string;
  start_icon_type = 'star-outline';
  deletefav = false;
  private isButtonsVisible = false;
  constructor(private contactservice: ContactAccessService,
    private fireauth: ContactAuthService,
    private firestore: ContactAccessService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private callNumber: CallNumber,
    private emailComposer: EmailComposer,
    private geolocation: Geolocation,
    private sms: SMS,
    private socialSharing: SocialSharing) {
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
    else if(this.from === 'liste-contacts'){
      this.personel();
      this.modified = true;
    }else if(this.from === 'favoris'){
      this.deletefav = true;
      this.isButtonsVisible = false;
      //this.favori();
    }
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
  cancel(){
    this.modified = true;
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
  setSMS() {
    // send sms in cordova
    const mytext = prompt('Ecrivez votre SMS');
    const options = {
      replaceLineBreaks: false,
      android: {
        intent: 'INTENT'
      }
    };
    this.sms.send(this.contact.tel, mytext,options);
  }
  email() {
    const mytext = prompt('Ecrivez votre message');
    const email = {
      to: this.contact.email, subject: 'Demmand de service : '+this.contact.service,
      body: mytext,
      isHtml: true
    };
    this.emailComposer.open(email);
  }
  appel() {
    this.callNumber.callNumber(this.contact.tel, true)
      .then(res => console.log('Ouverture de l appel!', res))
      .catch(err => console.log('Error', err));
  }
  localisationAndSendItByWhatsapp() {
    this.geolocation.getCurrentPosition().then((resp) => {
      const localisationCoordinates =  resp.coords.latitude.toString() + ',' + resp.coords.longitude.toString();
      //
      this.socialSharing.shareViaWhatsAppToReceiver(this.contact.tel,
        'Ma localisation est  \n  ' +  'https://www.google.com/maps/@'+localisationCoordinates, null).then(() => {
// Success!
      }).catch(() => {
// Error!
      });
      console.log(this.LocationUrl);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
Supprimer() {
    this.fireauth.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.contactservice.delateContactPersonel(res.email, this.contact.email);
        console.log('supprimé avec succéss');
        this.navCtrl.navigateForward('/liste-contacts');
      } else {
        this.navCtrl.navigateForward('/authentification');
      }
    }, err => {
      console.log('err', err);
    });
  }
  Modifier(){this.modified = false;}
  Partager() {
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
  Save(){
    this.fireauth.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        this.contactservice.setPersonalContact(res.email, this.emailContact, this.contact);

        this.navCtrl.navigateForward('/liste-contacts');
      } else {
        this.navCtrl.navigateForward('/authentification');
      }
    }, err => {
      console.log('err', err);
    });
    console.log(this.contact);
  }
}
