import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { StarRating } from '../star-rating/star-rating';

export interface RestaurantRatedEvent {
  id: number;
  rating: number;
}

@Component({
  selector: 'app-restaurant-card',
  imports: [StarRating],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestaurantCard {
  readonly restaurant = input.required<Restaurant>();
  readonly restaurantRated = output<RestaurantRatedEvent>();

  protected onRatingChanged(rating: number): void {
    this.restaurantRated.emit({ id: this.restaurant().id, rating });
  }
}
