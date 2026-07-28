import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { Header } from './components/header/header';
import { Connexion } from './connexion/connexion';
import { Inscription } from './inscription/inscription';
import { AuthService } from './services/auth.service';
import { PanierService } from './services/panier.service';
import { RestaurantService } from './services/restaurant.service';

type AuthMode = 'connexion' | 'inscription';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    Inscription,
    Connexion,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly panier = inject(PanierService);
  private readonly auth = inject(AuthService);
  private readonly restaurantService = inject(RestaurantService);

  protected readonly restaurantNom = environment.restaurantNom;

  // Auth gate
  protected readonly authMode = signal<AuthMode>('connexion');
  protected readonly isAuthenticated = this.auth.isAuthenticated;
  protected readonly userDisplayName = this.auth.displayName;

  // Etat du panier pour le badge
  protected readonly nombreArticles = this.panier.nombreArticles;

  // Stats restaurants pour le header (partagees via RestaurantService)
  protected readonly totalCount = this.restaurantService.totalCount;
  protected readonly ratedCount = this.restaurantService.ratedCount;
  protected readonly averageRating = this.restaurantService.averageRating;

  protected setAuthMode(mode: AuthMode): void {
    this.authMode.set(mode);
  }

  protected onLogout(): void {
    this.auth.logout();
    this.authMode.set('connexion');
  }
}
