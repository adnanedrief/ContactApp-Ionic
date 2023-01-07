import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ContactAuthService } from '../services/contact-auth.service';
import { ContactAccessService } from '../services/contact-acess.service';
import {Compte} from '../models/compte';
import { NavController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  private inscriptionForm: FormGroup;
  private compte: Compte;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  db: SQLiteObject;

  constructor(private fireauth: ContactAuthService,
    private firestore: ContactAccessService,
    private fromBuilder: FormBuilder,
    private navCtrl: NavController,
    private sqlite: SQLite) {
    this.inscriptionForm = this.fromBuilder.group({
      email: [''],
      password: [''],
      tel: [''],
      nom: [''],
      prenom: [''],
    });
    this.sqlite.create({
      name: 'data1.db',
      location: './src'
      })
      .then((db: SQLiteObject) => {
      this.db = db;
      this.db.executeSql(' create table contact1(nom VARCHAR(32), prenom VARCHAR(32),tel VARCHAR(32) primary key,'
      + 'email VARCHAR(32), adresse VARCHAR(32), ville VARCHAR(32), service VARCHAR(32) , photo VARCHAR(1000))', [])
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
   }

  ngOnInit() {
  }
  singUp() {
    this.fireauth.singUp(this.inscriptionForm.value).then(res => {
      console.log(res);
      this.firestore.newCompte((this.inscriptionForm.value));
      this.navCtrl.navigateForward('/authentification');
    }, err => {
      console.log(err);
    });
  }
}
