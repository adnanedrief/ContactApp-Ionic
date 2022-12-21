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
  compte: Compte;
  email: string;
  modified: boolean;
  constructor(private contactservice: ContactAccessService,
    private fireauth: ContactAuthService,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.modified = true;
    this.fireauth.userDetails().subscribe(res => {
      console.log('userDetails ==>', res);
      if (res !== null) {
        this.email = res.email;
        console.log('email ==>'+this.email);
      } else { this.navCtrl.navigateForward('/authentification'); }
    }, err => {
      console.log('err',err);
    });
    setTimeout(() => {
      console.log(this.contactservice.getCompte(this.email).subscribe(res => {
        this.compte = res as Compte;
        console.log('compte => ' +res);
      }));
    }, 800);
  }
  modifier(){
    this.modified = false;
  }
  updateProfile(){
    // this.fireauth.userDetails().subscribe(res => {
    //   console.log('res', res);
    //   if (res !== null) {
    //     console.log('this.compte ==> '+this.compte.nom);
    //     // eslint-disable-next-line @typescript-eslint/no-shadow
    //     this.contactservice.updateProfile(res.email, this.compte);

    //     this.navCtrl.navigateForward('/profile');
    //   } else {
    //     this.navCtrl.navigateForward('/authentification');
    //   }
    // }, err => {
    //   console.log('err', err);
    // });
    // console.log(this.compte);
  }
}
