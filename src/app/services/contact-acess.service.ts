import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Compte } from '../models/Compte';
import { Contact } from '../models/Contact';
@Injectable({
  providedIn: 'root'
})
export class ContactAccessService {


  constructor( private firestore: AngularFirestore) { }

  // Get Compte
  getCompte(id: string) {
    return this.firestore.doc('/Comptes/'+id).valueChanges();
  }
  // Get infos about the contact identified by email
  getContact(id: string) {
    return this.firestore.doc('/Contacts/'+id).valueChanges();
  }
  // get all accounts
  getAllCompte() {
    return this.firestore.collection('/Comptes/').snapshotChanges();
  }
// get all contacts
  getAllContact() {
  return this.firestore.collection('/Contacts/').snapshotChanges();
  }
  // get contact id2 from contact id1
  getPersonalContact(id1: string, id2: string ) {
    return this.firestore.doc('/Comptes/'+id1).collection('/Contacts').doc(id2).valueChanges();
  }
  // get  all contacts  from contact id(email)
  getAllPersonalContact(id) {
    return this.firestore.doc('/Comptes/'+id).collection('/Contacts/').snapshotChanges();
  }
  //add new account
  newCompte(compte: Compte) {
    return this.firestore.collection('/Comptes/').doc(compte.email).set(compte);
  }
  //add new shared account
  newContact(contact) {
    return this.firestore.collection('/Contacts').doc(contact.email).set(contact);
  }
  // add new contact in account identified by email
  newPersonalContact(id, contact) {
      this.firestore.doc('/Comptes/'+ id).collection('/Contacts/').doc(contact.email).set(contact);
      //this.firestore.collection('/Contacts/').doc(contact.email).set(contact);
  }
  delateContactPersonel(id1: string, id2: string ){
     this.firestore.doc('/Comptes/'+id1).collection('/Contacts').doc(id2).delete();
     //this.firestore.collection('/Contacts/').doc(id2).delete();
  }
  setPersonalContact(id1: string, id2: string, contact: Contact) {
    this.firestore.doc('/Comptes/'+id1).collection('/Contacts').doc(id2).delete();
    return this.firestore.doc('/Comptes/'+id1).collection('/Contacts').doc(contact.email).set(contact);
  }
  updateProfile(id: string , compte: Compte) {
    // this.firestore.doc('/Comptes/'+id).valueChanges();
   // this.firestore.doc('/Comptes/'+id).delete();
    return this.firestore.collection('/Comptes').doc(id).update(compte);
  }
}
