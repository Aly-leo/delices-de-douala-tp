import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule, JsonPipe],
  templateUrl: './inscription.html',
  styleUrl: './inscription.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Inscription {
  private readonly auth = inject(AuthService);

  // Emis quand l'utilisateur veut basculer vers l'ecran de connexion
  readonly basculerVersConnexion = output<void>();

  protected user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  protected confirmPassword = '';

  // null = pas d'erreur, sinon message a afficher
  protected readonly erreur = signal<string | null>(null);

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
    const resultat = this.auth.register(this.user);
    if (!resultat.ok) {
      this.erreur.set(
        resultat.reason === 'email-taken'
          ? 'Un compte existe déjà pour cet email.'
          : 'Impossible de créer le compte.',
      );
      return;
    }
    // Succès : AuthService a auto-connecté l'utilisateur → App bascule vers le site
  }

  protected onBasculer(): void {
    this.basculerVersConnexion.emit();
  }
}
