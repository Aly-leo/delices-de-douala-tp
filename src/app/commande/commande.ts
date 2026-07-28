import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LigneCommande } from '../ligne-commande/ligne-commande';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-commande',
  imports: [CurrencyPipe, LigneCommande],
  templateUrl: './commande.html',
  styleUrl: './commande.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Commande {
  private readonly panier = inject(PanierService);
  private readonly router = inject(Router);

  protected readonly lignes = this.panier.lignes;
  protected readonly total = this.panier.total;
  protected readonly nombreArticles = this.panier.nombreArticles;
  protected readonly estVide = this.panier.estVide;

  protected onIncrementer(platId: string): void {
    this.panier.incrementer(platId);
  }

  protected onDecrementer(platId: string): void {
    this.panier.decrementer(platId);
  }

  protected onRetirer(platId: string): void {
    this.panier.retirer(platId);
  }

  protected onViderPanier(): void {
    this.panier.vider();
  }

  protected onParcourirLaCarte(): void {
    // Navigation programmatique (chapitre 7 du cours)
    this.router.navigate(['/carte']);
  }
}
