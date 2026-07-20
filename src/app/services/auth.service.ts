import { computed, effect, Injectable, signal } from '@angular/core';
import { User } from '../models/user';

const USERS_KEY = 'delices-douala::users';
const SESSION_KEY = 'delices-douala::session';

export type LoginResult = { ok: true } | { ok: false; reason: 'not-found' | 'wrong-password' };
export type RegisterResult = { ok: true } | { ok: false; reason: 'email-taken' };

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Store des comptes créés (mock backend en localStorage)
  private readonly _users = signal<User[]>(this.chargerUsers());

  // Session courante — null si personne n'est connecté
  private readonly _currentUser = signal<User | null>(this.chargerSession());

  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this._currentUser() !== null);

  // Nom affichable dans le header une fois connecté
  readonly displayName = computed(() => {
    const u = this._currentUser();
    if (!u) return '';
    if (u.firstName) return u.firstName;
    return u.email.split('@')[0];
  });

  constructor() {
    // Persistance auto — sync du store à chaque changement
    effect(() => {
      const users = this._users();
      try {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      } catch {
        /* stockage indisponible — on ignore */
      }
    });
    effect(() => {
      const current = this._currentUser();
      try {
        if (current) {
          localStorage.setItem(SESSION_KEY, JSON.stringify(current));
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      } catch {
        /* idem */
      }
    });
  }

  register(user: User): RegisterResult {
    const email = user.email.trim().toLowerCase();
    if (this._users().some((u) => u.email.toLowerCase() === email)) {
      return { ok: false, reason: 'email-taken' };
    }
    const nouveau: User = {
      ...user,
      email,
      id: crypto.randomUUID(),
    };
    this._users.update((liste) => [...liste, nouveau]);
    this._currentUser.set(nouveau); // auto-login après inscription
    return { ok: true };
  }

  login(email: string, password: string): LoginResult {
    const emailNorm = email.trim().toLowerCase();
    const trouve = this._users().find((u) => u.email.toLowerCase() === emailNorm);
    if (!trouve) {
      return { ok: false, reason: 'not-found' };
    }
    if (trouve.password !== password) {
      return { ok: false, reason: 'wrong-password' };
    }
    this._currentUser.set(trouve);
    return { ok: true };
  }

  logout(): void {
    this._currentUser.set(null);
  }

  private chargerUsers(): User[] {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      return raw ? (JSON.parse(raw) as User[]) : [];
    } catch {
      return [];
    }
  }

  private chargerSession(): User | null {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }
}
