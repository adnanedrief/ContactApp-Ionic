import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ContactAccessService } from '../services/contact-acess.service';
import { ContactAuthService } from '../services/contact-auth.service';

@Component({
  selector: 'app-ajouter-contact',
  templateUrl: './ajouter-contact.page.html',
  styleUrls: ['./ajouter-contact.page.scss'],
})
export class AjouterContactPage implements OnInit {
  private ajouterContactForm: FormGroup;
  constructor( private navCtrl: NavController,
    private fireauth: ContactAuthService,
    private fromBuilder: FormBuilder
    , private firestore: ContactAccessService,
) {
  this.ajouterContactForm = this.fromBuilder.group({
    prenom: [''],
    nom: [''],
    email: [''],
    tel: [''],
    ville: [''],
    adresse: [''],
    service: [''],
    // eslint-disable-next-line max-len
    photo: ['https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/langfr-225px-Flag_of_Morocco.svg.png'],
  });
}

  ngOnInit() {
  }
  nouveauContact() {
    this.fireauth.userDetails().subscribe(res => {
      console.log('nouveauContact-res', res);
      if (res !== null) {
        this.firestore.newPersonalContact(res.email, this.ajouterContactForm.value);
        this.navCtrl.navigateForward('/liste-contacts');
      } else {
        this.navCtrl.navigateForward('/authentification');
      }
    }, err => {
      console.log('err', err);
    });
  }
}
