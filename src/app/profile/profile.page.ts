import { Component, OnInit } from '@angular/core';
import { Compte } from '../models/Compte';
import { ContactAccessService } from '../services/contact-acess.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  image: string;
  compte: any = {};
  constructor(private contactservice: ContactAccessService) { }

  ngOnInit() {
    console.log(this.contactservice.getCompte('adnane@hamza.com').subscribe(res => {
      this.compte = res as Compte;
      console.log(res);
    }));
  }

}
