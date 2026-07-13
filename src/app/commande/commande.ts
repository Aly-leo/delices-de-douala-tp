import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
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

  protected readonly lignes = this.panier.lignes;
  protected readonly total = this.panier.total;
  protected readonly nombreArticles = this.panier.nombreArticles;
  protected readonly estVide = this.panier.estVide;

  readonly parcourirLaCarte = output<void>();

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
    this.parcourirLaCarte.emit();
  }
}
