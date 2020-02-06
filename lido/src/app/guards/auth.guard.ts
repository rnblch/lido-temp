import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    private snackbar: MatSnackBar,
    public ngZone: NgZone
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.getAuthenticated().pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.ngZone.run(() => {
            this.router.navigate(['']);
          });
          this.snackbar.open(
            `You are not allowed to access this page without being logged in.`,
            'Ok',
            {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              politeness: 'polite',
              panelClass: 'snackbar'
            }
          );
          return false;
        }
      })
    );
  }
}
