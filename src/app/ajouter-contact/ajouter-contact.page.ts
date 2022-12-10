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
    photo: ['https://media.gettyimages.com/id/1357769664/video/national-flag-of-morocco-animation-stock-video-moroccan-flag-waving-in-loop-and-textured-3d.jpg?s=640x640&k=20&c=gGuWeJ2lgPnstSXEBJB42VhDAO7C9rbRitQUeSPVbDU='],
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
