export type PlatCategorie = 'Plats' | 'Grillades' | 'Végétarien' | 'Boissons';

export interface Plat {
  id: string;
  slug: string;
  nom: string;
  description: string;
  prix: number;
  categorie: PlatCategorie;
  disponible: boolean;
  image?: string;
}

export interface LigneCommande {
  plat: Plat;
  quantite: number;
}
