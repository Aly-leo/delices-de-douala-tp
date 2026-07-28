import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Plat } from '../../models/plat';
import { MenuService } from '../../services/menu.service';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'app-plat-detail',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './plat-detail.html',
  styleUrl: './plat-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatDetail {
  private readonly menuService = inject(MenuService);
  private readonly panier = inject(PanierService);

  // Le parametre :slug arrive DIRECTEMENT dans ce signal
  // grace a withComponentInputBinding() dans app.config.ts
  readonly slug = input.required<string>();

  protected readonly plats = this.menuService.plats;
  protected readonly isLoading = this.menuService.isLoading;
  protected readonly error = this.menuService.error;

  // Le slug est unique : on retrouve le plat correspondant
  protected readonly plat = computed(() =>
    this.plats()?.find((p) => p.slug === this.slug()),
  );

  protected readonly quantiteDansPanier = computed(() => {
    const p = this.plat();
    return p ? this.panier.quantitePour(p.id) : 0;
  });

  // Extrait les initiales du nom du plat pour le placeholder d'image
  // Ex : "Ndole aux crevettes" -> "NC" | "Poulet DG" -> "PD"
  protected initiales(nom: string): string {
    const mots = nom
      .split(/[\s+/-]+/)
      .filter((m) => m.length > 0 && !/^(aux?|de|la|le|les|et|du|des|au)$/i.test(m));
    if (mots.length === 0) return '?';
    if (mots.length === 1) return mots[0][0].toUpperCase();
    return (mots[0][0] + mots[1][0]).toUpperCase();
  }

  protected ajouterAuPanier(plat: Plat): void {
    this.panier.ajouter(plat);
  }
}
