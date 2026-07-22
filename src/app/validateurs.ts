import { AbstractControl, ValidationErrors } from '@angular/forms';

// Validateur de GROUPE : compare password et confirmation dans un FormGroup
export function motsDePasseIdentiques(
  group: AbstractControl,
): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmation = group.get('confirmation')?.value;
  return password === confirmation ? null : { motsDePasseDifferents: true };
}
