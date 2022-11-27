export class Contacts {
  private  nom: string;
  private prenom: string;
  private email: string;
  private tel: string;
  private ville: string;
  private adresse: string;
  private service: string;
  private compteEmail: number;
  // compteEmail : //foreign  key

    public getNom(): string {
        return this.nom;
    }

    public setNom(nom: string): void {
        this.nom = nom;
    }

    public getPrenom(): string {
        return this.prenom;
    }

    public setPrenom(prenom: string): void {
        this.prenom = prenom;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getTel(): string {
        return this.tel;
    }

    public setTel(tel: string): void {
        this.tel = tel;
    }

    public getVille(): string {
        return this.ville;
    }

    public setVille(ville: string): void {
        this.ville = ville;
    }

    public getAdresse(): string {
        return this.adresse;
    }

    public setAdresse(adresse: string): void {
        this.adresse = adresse;
    }

    public getService(): string {
        return this.service;
    }

    public setService(service: string): void {
        this.service = service;
    }

    public getCompteEmail(): number {
        return this.compteEmail;
    }

    public setCompteEmail(compteEmail: number): void {
        this.compteEmail = compteEmail;
    }

}
