import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ContactAccessService } from '../services/contact-acess.service';
import { ContactAuthService } from '../services/contact-auth.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {finalize, tap} from 'rxjs/operators';
import { Contact } from '../models/Contact';

@Component({
  selector: 'app-ajouter-contact',
  templateUrl: './ajouter-contact.page.html',
  styleUrls: ['./ajouter-contact.page.scss'],
})
export class AjouterContactPage implements OnInit {
  contact: Contact = new Contact('',
                                '',
                                '',
                                '',
                                '',
                                '',
                                '',
                                '');
  private ajouterContactForm: FormGroup;
  private uploadPercent: Observable<number>;
  private downloadURL: Observable<string>;
  constructor( private navCtrl: NavController,
    private fireauth: ContactAuthService,
    private fromBuilder: FormBuilder
    , private firestore: ContactAccessService,
    private storage: AngularFireStorage
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
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${new Date().getTime()}.png`;
    const ref = this.storage.ref(filePath);
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL() )
    )
    .subscribe();
  }
}
