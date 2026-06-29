import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { RestaurantCard, RestaurantRatedEvent } from '../restaurant-card/restaurant-card';

@Component({
  selector: 'app-restaurant-list',
  imports: [RestaurantCard],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestaurantList {
  readonly restaurants = input.required<Restaurant[]>();
  readonly restaurantRated = output<RestaurantRatedEvent>();

  protected onRestaurantRated(event: RestaurantRatedEvent): void {
    this.restaurantRated.emit(event);
  }
}
