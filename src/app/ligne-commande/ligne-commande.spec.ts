import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneCommande as LigneCommandeModel, Plat } from '../models/plat';
import { LigneCommande } from './ligne-commande';

const mockPlat: Plat = {
  id: 'test-1',
  nom: 'Ndolè test',
  description: 'Plat de test',
  prix: 3500,
  categorie: 'Plats',
  disponible: true,
};

const mockLigne: LigneCommandeModel = { plat: mockPlat, quantite: 2 };

describe('LigneCommande', () => {
  let component: LigneCommande;
  let fixture: ComponentFixture<LigneCommande>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigneCommande],
    }).compileComponents();

    fixture = TestBed.createComponent(LigneCommande);
    fixture.componentRef.setInput('ligne', mockLigne);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
