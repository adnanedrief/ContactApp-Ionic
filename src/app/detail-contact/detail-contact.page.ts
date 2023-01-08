/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Contact } from '../models/Contact';
import { ContactAccessService } from '../services/contact-acess.service';
import { ContactAuthService } from '../services/contact-auth.service';
import {CallNumber} from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';

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
  db: SQLiteObject;
  private isButtonsVisible = false;
  private localImage = '../../../../assets/img.png';

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
    private socialSharing: SocialSharing,
    private sqlite: SQLite) {
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
  ajouterFavori() {
    if(this.start_icon_type === 'star'){
      this.start_icon_type = 'star-outline';
      this.sqlite.create({
        name: 'data1.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.db = db;
          this.db.executeSql('delete from contact1 where tel="'+this.contact.tel+'"',[])
            .then(() => console.log('Executed SQL delete'))
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    }else {
      this.start_icon_type = 'star';
      this.sqlite.create({
        name: 'data1.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.db = db;
          this.db.executeSql('insert into contact1(nom, prenom, tel, email, adresse, ville, service, photo) values("'
            +this.contact.nom+'","'
            +this.contact.prenom+'","'
            +this.contact.tel+'","'
            +this.contact.email+'","'
            +this.contact.adresse+'","'
            +this.contact.ville+'","'
            +this.contact.service+'","'
            +this.contact.photo+ '")',[])
            .then(() => console.log('Executed SQL insert'))
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    }
    }
    getImage(item): string{
      console.log(this.localImage);
      return item == null? this.localImage:item;
    }
    favori(){
      this.sqlite.create({
        name: 'data1.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.db = db;
          this.db.executeSql('select * from contact1 where email="'+this.emailContact+'"',[])
          .then((data) => {this.contact = new Contact(
            data.rows.item(0).nom,
            data.rows.item(0).prenom,
            data.rows.item(0).email,
            data.rows.item(0).tel,
            data.rows.item(0).ville,
            data.rows.item(0).adresse,
            data.rows.item(0).service,
            data.rows.item(0).photo
          );})
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
        this.start_icon_type= 'star';
    }
    deleteFavorite(){
      this.sqlite.create({
        name: 'data1.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.db = db;
          this.db.executeSql('DELETE from contact1 where tel="'+this.contact.tel+'"',[])
            .then(() => {console.log('client' + this.contact.tel +'deleted successfuly');})
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
      this.favori();
      const navigationExtras: NavigationExtras = {
        queryParams: {
          from:'details-contact'
        }
      };
      this.navCtrl.navigateForward('/favorite', navigationExtras);
    }

}
