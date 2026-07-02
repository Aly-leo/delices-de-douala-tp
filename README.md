# Délices de Douala

> Guide culinaire camerounais — TP Angular Talent Lab 2026 (Jour 7 & Jour 8)

Application Angular 21 en deux pages :
- **Nos restaurants** — notation 5 étoiles de 6 restaurants emblématiques de Douala (TP Jour 7)
- **La Carte** — menu du restaurant servi depuis un JSON via `httpResource()`, filtrage par catégorie, recherche par nom, plat du jour rotatif (TP Jour 8)

## Démo en ligne

**Lien Vercel :** https://delices-de-douala-tp.vercel.app/

## Stack technique

- **Angular 21** — Standalone Components, `signal()`, `computed()`, `input()`, `output()`, `inject()`
- **Couche HTTP moderne** — `provideHttpClient(withFetch())` + `httpResource()` (pas de `HttpClientModule`)
- **RxJS interop** — `interval() → toSignal()` pour la rotation automatique
- **Control flow moderne** — `@if`, `@for` (aucun `*ngIf` / `*ngFor`)
- **TypeScript strict** — interfaces `Restaurant` et `Plat`
- **Environnements** — `serverUrl` et `restaurantNom` externalisés
- **SCSS** — design glassmorphism avec `backdrop-filter`
- **Typographies** : Fraunces (serif éditorial) + Inter

## Architecture

### Page Restaurants (Jour 7)

```
App
├── Header ◄─ [nom, ratedCount, totalCount, averageRating]
└── RestaurantList
    └── RestaurantCard (×6)
        └── StarRating
```

État : `signal<Restaurant[]>` au niveau `App`. Les notes remontent via une chaîne
d'`output()` jusqu'à `App`, qui fait un `.update()` immuable avec `.map()`.

### Page La Carte (Jour 8)

```
App
└── Carte ◄─ inject(MenuService)
    ├── PlatDuJour ◄─ [plats]
    │   └── interval(5000) → toSignal()
    └── PlatCard (×N filtrés)
```

Données : `MenuService` (providedIn root) encapsule un `httpResource<Plat[]>()`
qui charge `/api/plats.json`. Le service expose `plats`, `isLoading`, `error` en
lecture seule. `Carte` combine un signal `categorie` + un signal `recherche`
dans un `computed` `platsFiltres` — aucun recalcul manuel.

## Fonctionnalités

### Page Restaurants
- Grille de 6 cartes (nom, quartier, spécialité, 5 étoiles cliquables)
- Hover : étoiles précédentes dorées en temps réel
- Compteur header `X / 6 restaurants notés` + note moyenne
- Toggle **Trier par note** + toggle **Top notés (≥ 4 ★)**
- Retirer sa note (reclic sur la même étoile)

### Page La Carte (Jour 8)
- Chargement HTTP via `httpResource()` avec les 3 états : **loading** (spinner), **error** (message), **data** (grille)
- Prix en FCFA (`currency:'XAF':'symbol':'1.0-0'`)
- Filtre par catégorie (5 boutons : Toutes / Plats / Grillades / Végétarien / Boissons)
- Recherche par nom (input signal + computed)
- Plat du jour qui tourne toutes les 5 secondes (Observable RxJS → signal)
- Badge « Épuisé » + carte grisée pour les plats indisponibles

## Style

Design glassmorphism élégant, sans couleurs criardes :
- Fond nuit chaude (`#1a1410 → #3b2820`) avec 3 orbes flous qui dérivent
- Surfaces en verre : `backdrop-filter: blur(18–22px) saturate(135%)`
- Palette champagne / cream — accent doré `#e3b06b`
- Typographies serif (titres) + sans-serif (corps) chargées depuis Google Fonts

## Lancer en local

```bash
npm install
npm start
# ng serve --host 0.0.0.0 --port 8080 → ouvrir http://localhost:8080
```

## Build de production

```bash
npm run build
# artefacts dans dist/delicesDouala/browser/
```

## Structure

```
src/
├── environments/
│   ├── environment.ts                  ← prod (serverUrl, restaurantNom)
│   └── environment.development.ts
├── app/
│   ├── app.ts / app.html / app.scss    ← composant racine + nav onglets
│   ├── app.config.ts                   ← provideHttpClient(withFetch())
│   ├── models/
│   │   ├── restaurant.ts
│   │   └── plat.ts
│   ├── services/
│   │   └── menu.service.ts             ← httpResource + signal + asReadonly
│   └── components/
│       ├── header/                     ← reçoit nom + compteurs
│       ├── restaurant-list/            ← grille + retransmission output
│       ├── restaurant-card/            ← une carte de restaurant
│       ├── star-rating/                ← 5 étoiles interactives
│       ├── carte/                      ← page carte (filtre + recherche)
│       ├── plat-card/                  ← une carte de plat (badge épuisé)
│       └── plat-du-jour/               ← interval(5s) → toSignal
└── public/
    └── api/plats.json                  ← « serveur » local
```

---

© 2026 — TP réalisé dans le cadre du parcours **Angular Talent Lab** (cohorte Douala).
