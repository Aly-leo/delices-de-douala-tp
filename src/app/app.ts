import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Header } from './components/header/header';
import { RestaurantList } from './components/restaurant-list/restaurant-list';
import { RestaurantRatedEvent } from './components/restaurant-card/restaurant-card';
import { Restaurant } from './models/restaurant';

@Component({
  selector: 'app-root',
  imports: [Header, RestaurantList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly restaurants = signal<Restaurant[]>([
    { id: 1, name: 'Le Calao Doré', district: 'Akwa', specialty: 'Ndolé aux crevettes', currentRating: 0 },
    { id: 2, name: 'Chez Madame Ngono', district: 'Bonapriso', specialty: 'Eru aux pieds de bœuf', currentRating: 0 },
    { id: 3, name: 'La Fourchette Camerounaise', district: 'Bonanjo', specialty: 'Poulet DG', currentRating: 0 },
    { id: 4, name: 'Saveurs du Wouri', district: 'Bonamoussadi', specialty: 'Poisson braisé', currentRating: 0 },
    { id: 5, name: "L'Akwa Gourmand", district: 'Akwa', specialty: 'Bobolo et sauce arachide', currentRating: 0 },
    { id: 6, name: 'Le Royal de Bali', district: 'Bali', specialty: 'Koki et plantain', currentRating: 0 },
  ]);

  protected readonly sortByRating = signal(false);
  protected readonly onlyTopRated = signal(false);

  protected readonly totalCount = computed(() => this.restaurants().length);

  protected readonly ratedCount = computed(
    () => this.restaurants().filter((r) => r.currentRating > 0).length,
  );

  protected readonly averageRating = computed(() => {
    const rated = this.restaurants().filter((r) => r.currentRating > 0);
    if (rated.length === 0) {
      return 0;
    }
    const sum = rated.reduce((acc, r) => acc + r.currentRating, 0);
    return sum / rated.length;
  });

  protected readonly visibleRestaurants = computed(() => {
    let list = this.restaurants();
    if (this.onlyTopRated()) {
      list = list.filter((r) => r.currentRating >= 4);
    }
    if (this.sortByRating()) {
      list = [...list].sort((a, b) => b.currentRating - a.currentRating);
    }
    return list;
  });

  protected onRestaurantRated({ id, rating }: RestaurantRatedEvent): void {
    this.restaurants.update((list) =>
      list.map((r) => (r.id === id ? { ...r, currentRating: rating } : r)),
    );
  }

  protected toggleSort(): void {
    this.sortByRating.update((v) => !v);
  }

  protected toggleFilter(): void {
    this.onlyTopRated.update((v) => !v);
  }
}
