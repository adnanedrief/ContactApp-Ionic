/* eslint-disable @typescript-eslint/naming-convention */
import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-sauvgarde',
  templateUrl: './sauvgarde.page.html',
  styleUrls: ['./sauvgarde.page.scss'],
})
export class SauvgardePage implements OnInit {

  constructor(private file: File) {}

  ngOnInit() {}
  async sauvgarde(){
    const data = [
      ['Name', 'Age'], // headers
      ['John', 30],     // data
      ['Jane', 35],
      ['Bob', 25]
    ];
    const sheet = XLSX.utils.aoa_to_sheet(data);
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
    const fileName = 'data.xlsx';
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

