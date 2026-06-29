import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  imports: [],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarRating {
  readonly currentRating = input.required<number>();
  readonly ratingChanged = output<number>();

  protected readonly stars = [1, 2, 3, 4, 5] as const;
  protected readonly hoveredStar = signal(0);

  protected readonly displayRating = computed(() =>
    this.hoveredStar() > 0 ? this.hoveredStar() : this.currentRating(),
  );

  protected onClick(value: number): void {
    const next = this.currentRating() === value ? 0 : value;
    this.ratingChanged.emit(next);
  }

  protected onEnter(value: number): void {
    this.hoveredStar.set(value);
  }

  protected onLeave(): void {
    this.hoveredStar.set(0);
  }
}
