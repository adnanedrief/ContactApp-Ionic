export class Contact {
  prenom: string;
  nom: string;
  email: string;
  tel: string;
  ville: string;
  adresse: string;
  service: string;
  constructor(prenom: string, nom: string, email: string, tel: string,
    ville: string, adresse: string, service: string) {
    this.prenom = prenom;
    this.nom = nom;
    this.email = email;
    this.tel = tel;
    this.ville = ville;
    this.email = email;
    this.adresse = adresse;
    this.service = service;
  }
}
