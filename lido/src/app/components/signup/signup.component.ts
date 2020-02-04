import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NavigationStart, Router, RouterEvent } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ValidDomains } from './valid-lidos';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../login/login.component.css'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('1s', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('1s', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class SignupComponent implements OnInit {
  routerSubscription: Subscription;
  email: string;
  displayName: string;
  password: string;
  isEmailInvalid: boolean;
  validDomains = ValidDomains;
  constructor(
    public authService: AuthService,
    private dialogRef: MatDialogRef<SignupComponent>,
    private router: Router
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

  signup() {
    if (this.verifyEmailDomainIsALido()) {
      this.authService.signUp(this.email, this.password, this.displayName);
    } else {
      this.isEmailInvalid = true;
    }
  }

  verifyEmailDomainIsALido(): boolean {
    const domain = this.email.match(/@(.*)/g)[0].substring(1);
    return this.validDomains.includes(domain);
  }
}
