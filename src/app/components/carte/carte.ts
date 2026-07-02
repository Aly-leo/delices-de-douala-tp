import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { PlatCard } from '../plat-card/plat-card';

@Component({
  selector: 'app-carte',
  imports: [PlatCard],
  templateUrl: './carte.html',
  styleUrl: './carte.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carte {
  private readonly menuService = inject(MenuService);

  protected readonly plats = this.menuService.plats;
  protected readonly isLoading = this.menuService.isLoading;
  protected readonly error = this.menuService.error;
}
