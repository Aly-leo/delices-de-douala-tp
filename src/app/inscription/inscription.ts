import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule, JsonPipe],
  templateUrl: './inscription.html',
  styleUrl: './inscription.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Inscription {
  // Etat transitoire du formulaire — un seul objet lie par [(ngModel)]="user.xxx"
  protected user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  // Champ additionnel de confirmation (pas dans le modele User)
  protected confirmPassword = '';

  // Feedback apres soumission (state applicatif de l'ecran)
  protected readonly soumis = signal(false);

  // Getter reevalue a chaque cycle de change detection
  protected get motsDePassesCorrespondent(): boolean {
    return this.user.password === this.confirmPassword;
  }

  protected get formulaireValide(): boolean {
    return (
      !!this.user.firstName?.trim() &&
      !!this.user.lastName?.trim() &&
      !!this.user.email.trim() &&
      !!this.user.password &&
      this.motsDePassesCorrespondent
    );
  }

  protected soumettre(): void {
    if (!this.formulaireValide) {
      return;
    }
    this.soumis.set(true);
    // Dans une vraie app : appel service.creerCompte(this.user)
  }

  protected reinitialiser(): void {
    this.user = { firstName: '', lastName: '', email: '', password: '' };
    this.confirmPassword = '';
    this.soumis.set(false);
  }
}

// Variante signal-native (bonus) :
//   protected readonly user = signal<User>({ email: '', password: '' });
//   <input [value]="user().email" (input)="user.update(u => ({ ...u, email: $any($event.target).value }))" />
// On garde ici [(ngModel)]="user.xxx" pour respecter l'exercice principal.
