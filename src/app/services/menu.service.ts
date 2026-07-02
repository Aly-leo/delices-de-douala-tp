import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Plat } from '../models/plat';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly menuResource = httpResource<Plat[]>(
    () => `${environment.serverUrl}/api/plats.json`,
  );

  readonly plats = this.menuResource.value;
  readonly isLoading = this.menuResource.isLoading;
  readonly error = this.menuResource.error;
}
