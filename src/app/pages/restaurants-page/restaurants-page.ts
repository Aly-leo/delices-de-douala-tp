import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RestaurantList } from '../../components/restaurant-list/restaurant-list';
import { RestaurantRatedEvent } from '../../components/restaurant-card/restaurant-card';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurants-page',
  imports: [RestaurantList],
  templateUrl: './restaurants-page.html',
  styleUrl: './restaurants-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestaurantsPage {
  private readonly service = inject(RestaurantService);

  protected readonly sortByRating = signal(false);
  protected readonly onlyTopRated = signal(false);

  protected readonly visibleRestaurants = computed(() => {
    let list = this.service.restaurants();
    if (this.onlyTopRated()) {
      list = list.filter((r) => r.currentRating >= 4);
    }
    if (this.sortByRating()) {
      list = [...list].sort((a, b) => b.currentRating - a.currentRating);
    }
    return list;
  });

  protected onRestaurantRated({ id, rating }: RestaurantRatedEvent): void {
    this.service.noter(id, rating);
  }

  protected toggleSort(): void {
    this.sortByRating.update((v) => !v);
  }

  protected toggleFilter(): void {
    this.onlyTopRated.update((v) => !v);
  }
}
