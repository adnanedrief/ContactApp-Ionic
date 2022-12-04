import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Compte } from '../models/Compte';
@Injectable({
  providedIn: 'root'
})
export class ContactAccessService {


  constructor( private firestore: AngularFirestore) { }

  // Get Compte
  getCompte(id: string) {
    return this.firestore.doc('/Compte/'+id).valueChanges();
  }
  // Get infos about the contact identified by email
  getContact(id: string) {
    return this.firestore.doc('/Contact/'+id).valueChanges();
  }
  // get all accounts
  getAllCompte() {
    return this.firestore.collection('/Compte/').snapshotChanges();
  }
// get all contacts
  getAllContact() {
    return this.firestore.collection('/Contact/').snapshotChanges();
  }
  // get contact id2 from contact id1
  getPersonalContact(id1: string,id2: string,) {
    return this.firestore.doc('/Contact/'+id1).collection('/Contact/'+id2).doc(id2).valueChanges();
  }
  // get  all contacts  from contact id(email)
  getAllPersonalContact(id) {
    return this.firestore.doc('/Contact/'+id).collection('/Contact/');
  }
  //add new account
  newCompte(compte: Compte) {
    return this.firestore.collection('/Compte/').doc(compte.email).set(compte);
  }
  //add new shared account
  newContact(contact) {
    return this.firestore.collection('/Contact/').doc(contact.tel).set(contact);
  }
  // add new contact in account identified by email
  newPersonalContact(id, contact) {
    return this.firestore.doc('/Compte/' + id).collection('/Contact/').doc(contact.email).set(contact);
  }
}
