/* eslint-disable @typescript-eslint/naming-convention */
import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import { File } from '@ionic-native/file/ngx';
import { ContactAuthService } from '../services/contact-auth.service';
import { Contact } from '../models/Contact';
import { ContactAccessService } from '../services/contact-acess.service';

@Component({
  selector: 'app-sauvgarde',
  templateUrl: './sauvgarde.page.html',
  styleUrls: ['./sauvgarde.page.scss'],
})
export class SauvgardePage implements OnInit {
  private contacts: Contact[];
  private email: string;
  constructor(private file: File,private fireAuth: ContactAuthService, private firestore: ContactAccessService,) {}

  ngOnInit() {}
  async sauvgarde(){
    // const data = [
    //   ['Name', 'Age'], // headers
    //   ['John', 30],     // data
    //   ['Jane', 35],
    //   ['Bob', 25]
    // ];
    const rslt =[['Nom', 'Prenom', 'Tel', 'Service', 'Adresse', 'Ville', 'Email', 'Photo']];

  /* -------------------------------------------------------------------------- */
  this.fireAuth.userDetails().subscribe(res => {
    console.log('res', res);
    if(res !== null){
      this.email = res.email;
      this.firestore.getAllPersonalContact(this?.email).subscribe(data => {
        this.contacts = data.map(e => ({
          nom: e.payload.doc.data().nom,
          prenom: e.payload.doc.data().prenom,
          tel: e.payload.doc.data().tel,
          service: e.payload.doc.data().service,
          adresse: e.payload.doc.data().adresse,
          ville: e.payload.doc.data().city,
          email: e.payload.doc.data().email,
          photo: e.payload.doc.data().photo,
        }));
      });
    }
  });
  // convert to array
  this.contacts.forEach((contact) => {
    rslt.push([contact.nom, contact.prenom, contact.tel, contact.service, contact.adresse, contact.ville, contact.email, contact.photo]);
  });
  /* -------------------------------------------------------------------------- */
    const sheet = XLSX.utils.aoa_to_sheet(rslt);
    const workbook = {
      Sheets: {
        Sheet1: sheet
      },
      SheetNames: ['Sheet1']
    };
    const fileData = XLSX.write(workbook,  {
      bookType: 'xlsx',
      type: 'array'
    });
    const fileName = 'Sauvgarde contact de '+ this.email+ '.xlsx';
    try {
      const downloadDir = 'file:///storage/emulated/0/Download/'; // Android
      await this.file.writeFile(downloadDir, fileName, fileData, { replace: true });
      console.log(`Successfully saved Excel file to ${downloadDir}/${fileName}`);
      alert('La sauvgarde a été effectué avec succès dans le dossier Download de votre téléphone');
    } catch (error) {
      console.error('erreur de sauvgarde', error);
    }
}
}
