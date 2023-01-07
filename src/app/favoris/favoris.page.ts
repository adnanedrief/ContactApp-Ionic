import { Component, OnInit } from '@angular/core';
import {Contact} from '../models/Contact';
import {MenuController, NavController} from '@ionic/angular';

import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {
  db: SQLiteObject;
  contacts: Contact[] = [];
  contactSearchResult: Contact[] = [];
  email: string;
  from: string;
  localImage= '../../../../assets/img.png';
  constructor(private menuCtrl: MenuController,
              private navCtrl: NavController,
              private route: ActivatedRoute,
              private sqlite: SQLite,
              private router: Router,
              ) {
              this.route.queryParams.subscribe(params => {
                this.from = params.from;
              });
              if(this.from === 'details-contact'){
                this.loadContact();
              }
              this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.loadContact();
  }
  getImage(item): string{
    console.log(item);
    return item == null? this.localImage:item;
  }
  loadContact() {
    this.contacts = [];
    this.sqlite.create({
      name: 'data1.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db = db;
        this.db.executeSql('select * from contact1', [])
          .then((data) => {
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                this.contacts.push(new Contact(
                  data.rows.item(i).nom,
                  data.rows.item(i).prenom,
                  data.rows.item(i).email,
                  data.rows.item(i).tel,
                  data.rows.item(i).ville,
                  data.rows.item(i).adresse,
                  data.rows.item(i).service,
                  data.rows.item(i).photo
              ));
          }}})
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
    console.log(this.contacts);
  }
  detailsContact(email) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        emailContact: email,
        from:'liste-contacts'
      }
    };
    this.navCtrl.navigateForward('/detail-contact', navigationExtras);
  }
  searchContact(ev: any){
    const val = ev.target.value;
    if(val && val.trim() !== ''){
      this.contactSearchResult = this.contacts.filter((item)=>(item.nom.toLowerCase().indexOf(val.toLowerCase())>-1));
      this.contacts = this.contactSearchResult;
    }else{
      this.loadContact();
    }
  }
}
