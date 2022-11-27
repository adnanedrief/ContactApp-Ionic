export class Compte {
     // email : primary key
    private email: string;
    private nom: string;
    private prenom: string;
    private password: string;
    private tel: string;

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

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

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getTel(): string {
        return this.tel;
    }

    public setTel(tel: string): void {
        this.tel = tel;
    }

}
