import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { PlatCategorie } from '../../models/plat';
import { MenuService } from '../../services/menu.service';
import { PlatCard } from '../plat-card/plat-card';
import { PlatDuJour } from '../plat-du-jour/plat-du-jour';

type CategorieFiltre = PlatCategorie | 'Toutes';

@Component({
  selector: 'app-carte',
  imports: [PlatCard, PlatDuJour],
  templateUrl: './carte.html',
  styleUrl: './carte.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carte {
  private readonly menuService = inject(MenuService);

  protected readonly plats = this.menuService.plats;
  protected readonly isLoading = this.menuService.isLoading;
  protected readonly error = this.menuService.error;

  protected readonly categories: readonly CategorieFiltre[] = [
    'Toutes',
    'Plats',
    'Grillades',
    'Végétarien',
    'Boissons',
  ];

  protected readonly categorie = signal<CategorieFiltre>('Toutes');
  protected readonly recherche = signal('');

  protected readonly platsFiltres = computed(() => {
    const liste = this.plats() ?? [];
    const cat = this.categorie();
    const q = this.recherche().trim().toLowerCase();

    return liste.filter((p) => {
      const okCat = cat === 'Toutes' || p.categorie === cat;
      const okQuery = q === '' || p.nom.toLowerCase().includes(q);
      return okCat && okQuery;
    });
  });

  protected selectCategorie(cat: CategorieFiltre): void {
    this.categorie.set(cat);
  }

  protected onRechercheInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.recherche.set(target.value);
  }

  protected resetRecherche(): void {
    this.recherche.set('');
  }
}
