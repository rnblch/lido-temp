import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
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
    private snackbar: MatSnackBar
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.userData) {
      this.router.navigate(['']);
      this.snackbar.open(
        `You are not allowed to access this page without being logged in.`,
        'Ok',
        {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'left',
          politeness: 'polite',
          panelClass: 'snackbar'
        }
      );
    }
    return true;
  }
}
