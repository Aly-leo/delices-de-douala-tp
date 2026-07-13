import { computed, Injectable, signal } from '@angular/core';
import { LigneCommande, Plat } from '../models/plat';

@Injectable({ providedIn: 'root' })
export class PanierService {
  private readonly _lignes = signal<LigneCommande[]>([]);

  readonly lignes = this._lignes.asReadonly();

  readonly nombreArticles = computed(() =>
    this._lignes().reduce((acc, l) => acc + l.quantite, 0),
  );

  readonly total = computed(() =>
    this._lignes().reduce((acc, l) => acc + l.plat.prix * l.quantite, 0),
  );

  readonly estVide = computed(() => this._lignes().length === 0);

  ajouter(plat: Plat): void {
    this._lignes.update((lignes) => {
      const existante = lignes.find((l) => l.plat.id === plat.id);
      if (existante) {
        return lignes.map((l) =>
          l.plat.id === plat.id ? { ...l, quantite: l.quantite + 1 } : l,
        );
      }
      return [...lignes, { plat, quantite: 1 }];
    });
  }

  incrementer(platId: string): void {
    this._lignes.update((lignes) =>
      lignes.map((l) =>
        l.plat.id === platId ? { ...l, quantite: l.quantite + 1 } : l,
      ),
    );
  }

  decrementer(platId: string): void {
    this._lignes.update((lignes) =>
      lignes
        .map((l) => (l.plat.id === platId ? { ...l, quantite: l.quantite - 1 } : l))
        .filter((l) => l.quantite > 0),
    );
  }

  retirer(platId: string): void {
    this._lignes.update((lignes) => lignes.filter((l) => l.plat.id !== platId));
  }

  vider(): void {
    this._lignes.set([]);
  }

  quantitePour(platId: string): number {
    return this._lignes().find((l) => l.plat.id === platId)?.quantite ?? 0;
  }
}
