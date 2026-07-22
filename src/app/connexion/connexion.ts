import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-connexion',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './connexion.html',
  styleUrl: './connexion.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Connexion {
  private readonly auth = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  readonly basculerVersInscription = output<void>();

  // Le formulaire est decrit en TypeScript avec FormBuilder + Validators
  readonly connexionForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  // Acces pratique aux champs depuis le template
  get email() { return this.connexionForm.controls.email; }
  get password() { return this.connexionForm.controls.password; }

  // Erreur applicative (retournee par AuthService)
  protected readonly erreur = signal<string | null>(null);

  protected soumettre(): void {
    if (this.connexionForm.invalid) {
      return;
    }
    const { email, password } = this.connexionForm.getRawValue();
    const resultat = this.auth.login(email, password);
    if (!resultat.ok) {
      this.erreur.set(
        resultat.reason === 'not-found'
          ? 'Aucun compte trouvé pour cet email.'
          : 'Mot de passe incorrect.',
      );
      return;
    }
    this.erreur.set(null);
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
