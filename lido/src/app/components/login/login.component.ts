import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NavigationStart, Router, RouterEvent } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  routerSubscription: Subscription;
  email: string;
  password: string;
  constructor(
    public authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationStart),
        filter(() => !!this.dialogRef)
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  login() {
    this.authService.signIn(this.email, this.password);
  }

  resetPassword() {
    this.router.navigate(['forgot-password']);
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
