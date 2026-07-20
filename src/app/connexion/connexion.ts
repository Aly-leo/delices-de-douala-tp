import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule, JsonPipe],
  templateUrl: './connexion.html',
  styleUrl: './connexion.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Connexion {
  private readonly auth = inject(AuthService);

  // Emis quand l'utilisateur veut basculer vers l'ecran d'inscription
  readonly basculerVersInscription = output<void>();

  protected user: User = {
    email: '',
    password: '',
  };

  protected readonly erreur = signal<string | null>(null);

  protected get formulaireValide(): boolean {
    return !!this.user.email.trim() && !!this.user.password;
  }

  protected soumettre(): void {
    if (!this.formulaireValide) {
      return;
    }
    const resultat = this.auth.login(this.user.email, this.user.password);
    if (!resultat.ok) {
      this.erreur.set(
        resultat.reason === 'not-found'
          ? 'Aucun compte trouvé pour cet email.'
          : 'Mot de passe incorrect.',
      );
      return;
    }
    this.erreur.set(null);
    // Succès : AuthService a set currentUser → App bascule vers le site
  }

  protected onBasculer(): void {
    this.basculerVersInscription.emit();
  }

  protected effacerErreur(): void {
    if (this.erreur()) {
      this.erreur.set(null);
    }
  }
}
