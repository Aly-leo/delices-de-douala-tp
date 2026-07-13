import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { LigneCommande as LigneCommandeModel } from '../models/plat';

@Component({
  selector: 'app-ligne-commande',
  imports: [CurrencyPipe],
  templateUrl: './ligne-commande.html',
  styleUrl: './ligne-commande.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LigneCommande {
  readonly ligne = input.required<LigneCommandeModel>();

  readonly incrementer = output<string>();
  readonly decrementer = output<string>();
  readonly retirer = output<string>();

  protected readonly sousTotal = computed(
    () => this.ligne().plat.prix * this.ligne().quantite,
  );

  protected onIncrementer(): void {
    this.incrementer.emit(this.ligne().plat.id);
  }

  protected onDecrementer(): void {
    this.decrementer.emit(this.ligne().plat.id);
  }

  protected onRetirer(): void {
    this.retirer.emit(this.ligne().plat.id);
  }
}
