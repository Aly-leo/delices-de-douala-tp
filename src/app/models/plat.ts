export type PlatCategorie = 'Plats' | 'Grillades' | 'Végétarien' | 'Boissons';

export interface Plat {
  id: string;
  nom: string;
  prix: number;
  categorie: PlatCategorie;
  disponible: boolean;
}
