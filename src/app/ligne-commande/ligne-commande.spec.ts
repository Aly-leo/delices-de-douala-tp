import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneCommande } from './ligne-commande';

describe('LigneCommande', () => {
  let component: LigneCommande;
  let fixture: ComponentFixture<LigneCommande>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigneCommande],
    }).compileComponents();

    fixture = TestBed.createComponent(LigneCommande);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
