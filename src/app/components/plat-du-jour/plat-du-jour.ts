import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, startWith } from 'rxjs';
import { Plat } from '../../models/plat';

@Component({
  selector: 'app-plat-du-jour',
  imports: [CurrencyPipe],
  templateUrl: './plat-du-jour.html',
  styleUrl: './plat-du-jour.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatDuJour {
  readonly plats = input.required<Plat[]>();

  private readonly tick = toSignal(interval(5000).pipe(startWith(-1)), { initialValue: -1 });

  protected readonly platDuJour = computed<Plat | null>(() => {
    const disponibles = this.plats().filter((p) => p.disponible);
    if (disponibles.length === 0) {
      return null;
    }
    const t = this.tick();
    const index = ((t < 0 ? 0 : t + 1) % disponibles.length + disponibles.length) % disponibles.length;
    return disponibles[index];
  });
}
