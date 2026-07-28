import { computed, Injectable, signal } from '@angular/core';
import { Restaurant } from '../models/restaurant';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  private readonly _restaurants = signal<Restaurant[]>([
    { id: 1, name: 'Le Calao Doré', district: 'Akwa', specialty: 'Ndolé aux crevettes', currentRating: 0 },
    { id: 2, name: 'Chez Madame Ngono', district: 'Bonapriso', specialty: 'Eru aux pieds de bœuf', currentRating: 0 },
    { id: 3, name: 'La Fourchette Camerounaise', district: 'Bonanjo', specialty: 'Poulet DG', currentRating: 0 },
    { id: 4, name: 'Saveurs du Wouri', district: 'Bonamoussadi', specialty: 'Poisson braisé', currentRating: 0 },
    { id: 5, name: "L'Akwa Gourmand", district: 'Akwa', specialty: 'Bobolo et sauce arachide', currentRating: 0 },
    { id: 6, name: 'Le Royal de Bali', district: 'Bali', specialty: 'Koki et plantain', currentRating: 0 },
  ]);

  readonly restaurants = this._restaurants.asReadonly();
  readonly totalCount = computed(() => this._restaurants().length);
  readonly ratedCount = computed(
    () => this._restaurants().filter((r) => r.currentRating > 0).length,
  );
  readonly averageRating = computed(() => {
    const rated = this._restaurants().filter((r) => r.currentRating > 0);
    if (rated.length === 0) return 0;
    const sum = rated.reduce((acc, r) => acc + r.currentRating, 0);
    return sum / rated.length;
  });

  noter(id: number, rating: number): void {
    this._restaurants.update((list) =>
      list.map((r) => (r.id === id ? { ...r, currentRating: rating } : r)),
    );
  }
}
