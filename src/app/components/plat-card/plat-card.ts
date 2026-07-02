import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Plat } from '../../models/plat';

@Component({
  selector: 'app-plat-card',
  imports: [CurrencyPipe],
  templateUrl: './plat-card.html',
  styleUrl: './plat-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatCard {
  readonly plat = input.required<Plat>();
}
