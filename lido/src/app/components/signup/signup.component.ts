import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { AuthService } from '../../services/auth.service';
import { SidenavService } from '../../services/sidenav.service';
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
  email: string;
  displayName: string;
  password: string;
  isEmailInvalid: boolean;
  validDomains = ValidDomains;
  constructor(
    public authService: AuthService,
    public dialogRef: MatDialogRef<SignupComponent>,
    private sidenav: SidenavService
  ) {}

  ngOnInit() {}

  signup() {
    this.authService.signUp(this.email, this.password, this.displayName);
    this.dialogRef.close();
    if (this.verifyEmailDomainIsALido()) {
      // TODO: sidenav close
      this.authService.signUp(this.email, this.password, this.displayName);
      this.dialogRef.close();
    } else {
      // this.isEmailInvalid = true;
    }
  }

  verifyEmailDomainIsALido(): boolean {
    const domain = this.email.match(/@(.*)/g)[0].substring(1);
    return this.validDomains.includes(domain);
  }
}
