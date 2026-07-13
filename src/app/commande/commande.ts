import { Plat } from './../models/plat';
import { Component } from '@angular/core';
import { PlatCard } from '../components/plat-card/plat-card';


@Component({
  selector: 'app-commande',
  imports: [PlatCard],
  templateUrl: './commande.html',
  styleUrl: './commande.scss',
})
export class Commande {}
