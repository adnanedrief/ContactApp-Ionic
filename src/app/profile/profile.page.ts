import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Compte } from '../models/Compte';
import { ContactAccessService } from '../services/contact-acess.service';
import { ContactAuthService } from '../services/contact-auth.service';
import { FormBuilder } from '@angular/forms';

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
  editProfileForm: any;
  profileInfo: Compte ;
  currentPassword: any;
  constructor(private contactservice: ContactAccessService,
    private fireauth: ContactAuthService,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    ) {
      this.editProfileForm = this.formBuilder.group({
        nom: [''],
        prenom: [''],
        email: [''],
        tel: [''],
      });
    }
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
        this.currentPassword = this.compte.password;
        console.log('compte => ' +res);
      }));
    }, 800);
  }
  modifier(){
    this.modified = false;
  }
  updateProfile(){
     this.profileInfo = {
      nom: this.editProfileForm.get('nom')?.value,
      password: this.currentPassword,
      prenom: this.editProfileForm.get('prenom')?.value,
      email: this.editProfileForm.get('email')?.value,
      tel: this.editProfileForm.get('tel')?.value,
    };
    console.log('this.profileInfo => '+this.profileInfo);
    this.contactservice.updateProfile(this.email,this.profileInfo);
    this.navCtrl.navigateForward('/profile');
  }
}
