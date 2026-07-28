import { Routes } from '@angular/router';
import { Carte } from './components/carte/carte';
import { Commande } from './commande/commande';
import { RestaurantsPage } from './pages/restaurants-page/restaurants-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'restaurants' },
  { path: 'restaurants', component: RestaurantsPage },
  { path: 'carte', component: Carte },
  { path: 'panier', component: Commande },
  // La route dynamique plats/:slug sera ajoutee avec le composant PlatDetail
  { path: '**', redirectTo: '' },
];
