# Délices de Douala

> Système de notation de restaurants à 5 étoiles — TP Angular Talent Lab 2026

Une mini-application Angular qui référence 6 restaurants emblématiques de Douala
(Le Calao Doré, Chez Madame Ngono, La Fourchette Camerounaise, Saveurs du Wouri,
L'Akwa Gourmand, Le Royal de Bali) et permet à un visiteur de les noter de 1 à 5
étoiles. Le header affiche en temps réel combien de restaurants ont reçu une note
ainsi que la note moyenne globale.

## Démo en ligne

 **Lien Vercel :** _compléter après le déploiement_

## Stack technique

- **Angular 21** — Standalone Components, `signal()`, `computed()`, `input()`, `output()`
- **Control flow moderne** — `@if`, `@for` (aucun `*ngIf` / `*ngFor`)
- **TypeScript strict** + interface `Restaurant`
- **SCSS** — design glassmorphism avec `backdrop-filter`
- **Typographies** : Fraunces (serif éditorial) + Inter

## Architecture (3 niveaux de communication)

```
App  ───────────────────────────────────────────┐
│   • signal<Restaurant[]>                       │
│   • computed: ratedCount, averageRating        │
│                                                │
├─[ratedCount, totalCount, averageRating]──► Header
│
└─[restaurants]──► RestaurantList
                   ▲ (restaurantRated)
                   │
                   └─[restaurant]──► RestaurantCard
                                      ▲ (restaurantRated)
                                      │
                                      └─[currentRating]──► StarRating
                                                            ▲ (ratingChanged)
```

Chaque composant est **standalone**, utilise **`input()` / `output()`** (jamais les
décorateurs `@Input` / `@Output`), et `ChangeDetectionStrategy.OnPush`. L'état est
géré au niveau racine via `signal()` et propagé en lecture vers les enfants via les
inputs ; les notes remontent via une chaîne d'`output()` jusqu'à `App` qui fait un
`.update()` immuable avec `.map()`.

## Fonctionnalités

### Obligatoires 
-  Grille de 6 cartes (nom, quartier, spécialité, 5 étoiles cliquables)
-  Hover : étoiles précédentes dorées en temps réel
-  Clic : fixe la note et persiste l'affichage doré
-  Label `(X/5)` ou `Cliquez !` sous les étoiles
-  Compteur header `X / 6 restaurants notés` mis à jour en temps réel
-  Re-noter ne double pas le compteur (logique par `currentRating > 0`)
-  Code propre : interface TS, signals, `@if`/`@for`, standalone

### Bonus
-  **Note moyenne** affichée dans le header dès la première notation
-  **Retirer sa note** : recliquer sur la même étoile remet à 0
-  **Trier par note** décroissante (toggle dans la toolbar)
-  **Filtrer** sur les restaurants notés ≥ 4 étoiles (toggle dans la toolbar)
-  **Animation** : `transform: scale(1.18)` sur les étoiles au hover + glow doux

##  Style

Design glassmorphism élégant, sans couleurs criardes :
- Fond nuit chaude (`#1a1410 → #3b2820`) avec 3 orbes flous qui dérivent
- Surfaces en verre : `backdrop-filter: blur(18–22px) saturate(135%)`
- Palette champagne / cream — accent doré `#e3b06b`
- Typographies serif (titres) + sans-serif (corps) chargées depuis Google Fonts

##  Lancer en local

```bash
npm install
npm start
# puis ouvrir http://localhost:4200
```

##  Build de production

```bash
npm run build
# artefacts dans dist/delicesDouala/
```

##  Structure

```
src/app/
├── app.ts / app.html / app.scss       ← composant racine (signals + computed)
├── models/restaurant.ts                ← interface Restaurant
└── components/
    ├── header/                         ← affiche compteur + moyenne
    ├── restaurant-list/                ← grille + retransmission output
    ├── restaurant-card/                ← carte d'un restaurant
    └── star-rating/                    ← 5 étoiles interactives
```

---

© 2026 — TP réalisé dans le cadre du parcours **Angular Talent Lab** (cohorte Douala).
