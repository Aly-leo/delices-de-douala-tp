import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Inscription {
  // Etat transitoire du formulaire — lie a [(ngModel)]
  protected nom = '';

  // Etat applicatif — la liste des clients inscrits (signal, jamais mute)
  private readonly _clients = signal<string[]>([]);
  readonly clients = this._clients.asReadonly();

  // Suit la ligne en cours de modification (null = mode ajout)
  private readonly _indexEdite = signal<number | null>(null);
  protected readonly enEdition = computed(() => this._indexEdite() !== null);

  // Ajoute ou remplace le client selon le mode courant
  protected enregistrer(): void {
    const valeur = this.nom.trim();
    if (!valeur) {
      return;
    }
    const i = this._indexEdite();
    if (i === null) {
      this._clients.update((liste) => [...liste, valeur]);
    } else {
      this._clients.update((liste) =>
        liste.map((c, idx) => (idx === i ? valeur : c)),
      );
      this._indexEdite.set(null);
    }
    this.nom = '';
  }

  // Recharge la ligne dans le champ pour edition en place
  protected modifier(i: number): void {
    this.nom = this.clients()[i];
    this._indexEdite.set(i);
  }

  // Reconstruit la liste sans l'element i (jamais splice)
  protected supprimer(i: number): void {
    this._clients.update((liste) => liste.filter((_, idx) => idx !== i));
    // Annule l'edition si on supprimait la ligne editee
    if (this._indexEdite() === i) {
      this._indexEdite.set(null);
      this.nom = '';
    }
  }

  protected annulerEdition(): void {
    this._indexEdite.set(null);
    this.nom = '';
  }
}

// Variante signal-native (chapitre 4 du cours) — sans FormsModule :
//   protected readonly nom = signal('');
// Dans le template :
//   <input [value]="nom()" (input)="nom.set($any($event.target).value)" />
// On garde ici [(ngModel)] pour respecter l'exercice principal.
