import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Plat } from '../../models/plat';

@Component({
  selector: 'app-plat-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './plat-card.html',
  styleUrl: './plat-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatCard {
  readonly plat = input.required<Plat>();
  readonly quantiteDansPanier = input<number>(0);
  readonly ajouter = output<Plat>();

  protected readonly expanded = signal(false);

  protected toggleExpanded(): void {
    if (!this.plat().disponible) {
      return;
    }
    this.expanded.update((v) => !v);
  }

  protected onAjouter(event: Event): void {
    event.stopPropagation();
    this.ajouter.emit(this.plat());
  }

  protected onDetails(event: Event): void {
    // On stoppe la propagation pour ne pas re-toggler l'expanded de la carte
    event.stopPropagation();
  }
}
