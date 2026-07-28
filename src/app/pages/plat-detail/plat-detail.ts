import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Plat, PlatCategorie } from '../../models/plat';
import { MenuService } from '../../services/menu.service';
import { PanierService } from '../../services/panier.service';

const ICONES_CATEGORIE: Record<PlatCategorie, string> = {
  Plats: '🍲',
  Grillades: '🐟',
  Végétarien: '🌿',
  Boissons: '🥤',
};

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

  protected icone(categorie: PlatCategorie): string {
    return ICONES_CATEGORIE[categorie];
  }

  protected ajouterAuPanier(plat: Plat): void {
    this.panier.ajouter(plat);
  }
}
