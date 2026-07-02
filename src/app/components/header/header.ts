import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [DecimalPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly nom = input.required<string>();
  readonly ratedCount = input.required<number>();
  readonly totalCount = input.required<number>();
  readonly averageRating = input.required<number>();
}
