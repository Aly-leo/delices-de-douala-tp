import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { motsDePasseIdentiques } from '../validateurs';

@Component({
  selector: 'app-inscription',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './inscription.html',
  styleUrl: './inscription.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Inscription {
  private readonly auth = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  readonly basculerVersConnexion = output<void>();

  // FormGroup nonNullable + validateurs par champ + validateur croise sur le groupe
  readonly inscriptionForm = this.fb.nonNullable.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmation: ['', Validators.required],
    },
    { validators: motsDePasseIdentiques },
  );

  get firstName() { return this.inscriptionForm.controls.firstName; }
  get lastName() { return this.inscriptionForm.controls.lastName; }
  get email() { return this.inscriptionForm.controls.email; }
  get password() { return this.inscriptionForm.controls.password; }
  get confirmation() { return this.inscriptionForm.controls.confirmation; }

  protected readonly erreur = signal<string | null>(null);

  protected soumettre(): void {
    if (this.inscriptionForm.invalid) {
      return;
    }
    const { firstName, lastName, email, password } = this.inscriptionForm.getRawValue();
    const resultat = this.auth.register({ firstName, lastName, email, password });
    if (!resultat.ok) {
      this.erreur.set(
        resultat.reason === 'email-taken'
          ? 'Un compte existe déjà pour cet email.'
          : 'Impossible de créer le compte.',
      );
      return;
    }
    this.erreur.set(null);
  }

  protected onBasculer(): void {
    this.basculerVersConnexion.emit();
  }
}
