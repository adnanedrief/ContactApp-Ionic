import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Compte } from '../models/Compte';
import { ContactAccessService } from '../services/contact-acess.service';
import { ContactAuthService } from '../services/contact-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  image: string;
  compte: any = {};
  email: string;
  constructor(private contactservice: ContactAccessService,
    private fireauth: ContactAuthService,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.fireauth.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.email = res.email;
      } else { this.navCtrl.navigateForward('/authentification'); }
    }, err => {
      console.log('err',err);
    });
    console.log(this.contactservice.getCompte(this.email).subscribe(res => {
      this.compte = res as Compte;
      console.log('compte => ' +res);
    }));
  }
}
